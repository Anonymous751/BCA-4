  import UserService from "../services/user.services.js";
  import { sendOTPEmail } from "../../../../helpers/email.helper.js";
  import User from "../models/user.model.js";    
  import Blog from "../../blogs/models/blog.model.js"; 

  const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
  };

  class UserController {

      // Register Users
  static async registerUser(req, res) {
    try {
      const { username, email, password, confirm_password, roles } = req.body;

      if (!username || !email || !password || !confirm_password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (password !== confirm_password) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      // ✅ avatar from GridFS (store ObjectId)
      const avatarId = req.file ? req.file.id : null;

      const user = await UserService.registerUserService({
        username,
        email,
        password,
        roles,
        avatar: avatarId,  // store GridFS file ID
      });

      console.log("📩 OTP for user:", email, "is", user.otp);

      return res.status(201).json({
        message: "✅ User registered successfully",
        user,
        otp: user.otp, // expose for testing only
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }   

      // Get All Users
     static async getUsers(req, res) {
  try {
    const users = await UserService.getAllUsersService();
    return res.status(200).json({ users });  // 👈 wrapped
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Get user by Id
static getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Error fetching user by ID:", err);
    res.status(500).json({ success: false, error: "Failed to fetch user" });
  }
};

      // Verify OTP
      static async verifyOTP(req, res) {
          try {
              const { email, otp } = req.body;
              if (!email || !otp) {
                  return res.status(400).json({ error: "Email and OTP are required" });
              }

              const user = await UserService.verifyOTPService({ email, otp });

              return res.status(200).json({
                  message: "✅ Email verified successfully",
                  user,
              });
          } catch (err) {
              return res.status(400).json({ error: err.message });
          }
      }

      // Login User
     // Login User
static async login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { token, user } = await UserService.loginService({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Ensure roles array exists
    const userRoles = Array.isArray(user.roles) && user.roles.length ? user.roles : ["Reader"];

    res.cookie(process.env.COOKIE_NAME || "token", token, cookieOptions);

    return res.status(200).json({
      token,
      message: "✅ Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: userRoles, // send roles array to frontend
      },
    });
  } catch (err) {
    return res.status(401).json({ error: err.message || "Invalid credentials" });
  }
}

      // Logout User
      static async logout(req, res) {
          try {
              const { message } = await UserService.logoutService();

              res.clearCookie(process.env.COOKIE_NAME || "token", {
                  httpOnly: true,
                  secure: false,
                  sameSite: "lax",

              });

              return res.status(200).json({ message });
          } catch (err) {
              return res.status(500).json({ error: err.message });
          }
      }

      // Resend OTP
      static async resendOTP(req, res) {
          try {
              const { email } = req.body;
              const data = await UserService.resendOTP(email);

              return res.status(200).json({
                  message: "OTP resent successfully",
                  otp: data.otp, // remove in production
                  attemptsLeft: data.attemptsLeft,
                  previewURL: data.previewURL
              });
          } catch (err) {
              return res.status(400).json({ error: err.message });
          }
      }

      // Change Password - (Old to New)
      static async changePassword(req, res) {
          try {
              const { oldPassword, newPassword } = req.body;
              if (!oldPassword || !newPassword) {
                  return res.status(400).json({ error: "Old and new password are required" });
              }

              await UserService.changePasswordService(req.user.id, oldPassword, newPassword);

              return res.status(200).json({ message: "Password changed successfully ✅" });
          } catch (err) {
              return res.status(400).json({ error: err.message });
          }
      }

      // Request Password Reset to OTP
    static async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      const response = await UserService.requestPasswordReset(email);

      console.log("✅ Password reset service response:", response);

      // make sure you send response
      return res.status(200).json(response);
    } catch (error) {
      console.error("❌ requestPasswordReset error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }


      // Reset Password with OTP
      static async resetPasswordWithOTP(req, res) {
          try {
              const { email, otp, newPassword } = req.body;
              const result = await UserService.resetPasswordWithOTP(email, otp, newPassword);
              return res.status(200).json(result);
          } catch (err) {
              return res.status(400).json({ error: err.message });
          }
      }

      // Logged In User Profile
    static async getLoggedInUser(req, res) {
  try {
    console.log("👉 req.user:", req.user); // <--- log here

    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized: No user in token" });
    }

    const user = await UserService.getUserProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    return res.status(200).json({
      message: "✅ User profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("❌ getLoggedInUser error:", err.message);
    return res.status(400).json({ error: err.message });
  }
}

  //  update User Profile

static updateProfile = async (req, res) => {
  try {
    console.log("📩 UpdateProfile Request →", {
      userId: req.user.id,
      updateData: req.body,
      file: req.file,
    });

    // 🟢 If file uploaded, use new avatar, otherwise keep old
    const avatarId = req.file ? req.file.id : undefined;

    // Build updateData properly
    const updateData = {
      ...req.body,
      ...(avatarId && { avatar: avatarId }) // only add avatar if file uploaded
    };

    console.log("🛠 Final updateData →", updateData);

    const updatedUser = await UserService.updateProfileService({
      userId: req.user.id,
      updateData,
      requesterRoles: req.user.roles,
    });

    console.log("✅ Updated User (after save) →", updatedUser);

    res.json({
      message: "✅ Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Update Profile Error →", error);
    res.status(500).json({ message: "❌ Error updating profile", error });
  }
};


// Update user
static updateUser = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete user
static deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


// Admin Stats 

static async getDashboardStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const totalBlogs = await Blog.countDocuments();
    const authors = await User.countDocuments({ roles: "Author" });
    const readers = await User.countDocuments({ roles: "Reader" });

    console.log("Dashboard Stats:", { totalUsers, verifiedUsers, totalBlogs, authors, readers });

    res.status(200).json({
      success: true,
      stats: { totalUsers, verifiedUsers, totalBlogs, authors, readers },
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

  // Admin-only: Update roles of any user by Admin only.
  static async updateUserRoles(req, res) {
    try {
      const adminRoles = req.user.roles; // from JWT
      if (!adminRoles.includes("Admin")) {
        return res.status(403).json({ error: "Only Admin can update roles" });
      }

      const { userId, roles } = req.body;
      if (!userId || !roles) {
        return res.status(400).json({ error: "userId and roles are required" });
      }

      const allowedRoles = ["Admin", "Author", "Reader"];
      const invalidRoles = roles.filter(role => !allowedRoles.includes(role));

      if (invalidRoles.length > 0) {
        return res.status(400).json({
          error: `Invalid roles detected: ${invalidRoles.join(", ")}. Allowed roles are Admin, Author, Reader.`,
        });
      }

      const updatedUser = await UserService.updateUserRolesService(userId, roles);

      return res.status(200).json({
        message: "✅ User roles updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }


  }

  export default UserController;
