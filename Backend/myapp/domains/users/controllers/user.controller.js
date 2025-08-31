import UserService from "../services/user.services.js";
import { sendOTPEmail } from "../../../../helpers/email.helper.js";

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
            const { username, email, password, confirm_password, roles, avatar } = req.body;
            if (!username || !email || !password || !confirm_password) {
                return res.status(400).json({ error: "All fields are required" });
            }
            if (password !== confirm_password) {
                return res.status(400).json({ error: "Passwords do not match" });
            }

            const { user, otp } = await UserService.registerUserService({
                username,
                email,
                password,
                roles,
                avatar,
            });

            try {
                const info = await sendOTPEmail(email, otp);
                return res.status(201).json({
                    message: "✅ User registered successfully",
                    user,
                    otp, // remove in production
                    previewURL: info ? info.previewURL || null : null,
                });
            } catch (mailErr) {
                return res.status(201).json({
                    message: "✅ User registered (email failed)",
                    user,
                    otp,
                    emailError: mailErr.message,
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Get All Users
    static async getUsers(req, res) {
        try {
            const users = await UserService.getAllUsersService();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

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
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const { token, user } = await UserService.loginService({ email, password });

            res.cookie(process.env.COOKIE_NAME || "token", token, cookieOptions);

            return res.status(200).json({
                token,
                message: "✅ Logged in successfully",
                user,
            });
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }

    // Logout User
    static async logout(req, res) {
        try {
            const { message } = await UserService.logoutService();

            res.clearCookie(process.env.COOKIE_NAME || "token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
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
            const result = await UserService.requestPasswordReset(email);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
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
      const user = await UserService.getUserProfile(req.user.id || req.user._id);
      return res.status(200).json({
        message: "✅ User profile fetched successfully",
        user,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
//  update User Profile
static async updateProfile(req, res) {
  try {
    const userId = req.user.id; // from JWT
    const updateData = req.body;

    // If roles are included in updateData, allow only Admin to update
    if (updateData.roles) {
      if (!req.user.roles.includes("Admin")) {
        return res.status(403).json({ error: "Only Admin can update roles" });
      }
    }

    const updatedUser = await UserService.updateProfileService(userId, updateData);

    return res.status(200).json({
      message: "✅ Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
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
