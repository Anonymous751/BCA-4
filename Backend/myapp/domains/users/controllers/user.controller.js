import UserService from "../services/user.services.js";
import { sendOTPEmail } from "../../../../helpers/email.helper.js";
import OTPService from "../../../../myapp/domains/users/services/user.services.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true on HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day (match JWT_EXPIRES)
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

      // send otp email (Ethereal) — optional, non-blocking if you want
      try {
        const info = await sendOTPEmail(email, otp);
        // include preview url for testing
        return res.status(201).json({
          message: "✅ User registered successfully",
          user,
          otp, // for testing only — remove in prod
          previewURL: info ? info.previewURL || null : null,
        });
      } catch (mailErr) {
        // still return user but warn about email
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

//   Gell All Users
  static async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsersService();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

// Verify-OTP
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

      // set http-only cookie
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
// Send OTP

 static async sendOTP(req, res) {
    try {
      const { email } = req.body;

      const { otp, previewURL } = await OTPService.sendOTP(email);

      return res.status(200).json({
        message: "OTP sent successfully",
        otp, // remove later in production
        previewURL,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

// Change Password
static async changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new password are required" });
    }

    // ✅ use req.user.id, not req.user._id
    await UserService.changePasswordService(req.user.id, oldPassword, newPassword);

    return res.status(200).json({ message: "Password changed successfully ✅" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

static async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      const result = await UserService.requestPasswordReset(email);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }


 static async resetPasswordWithOTP(req, res) {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await UserService.resetPasswordWithOTP(email, otp, newPassword);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }


}

export default UserController;






//  static async logout(req, res) {
//     try {
//       res.clearCookie(process.env.COOKIE_NAME || "token", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//       });
//       return res.status(200).json({ message: "👋 Logged out" });
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   }