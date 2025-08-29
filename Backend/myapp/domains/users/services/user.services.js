    import { hashPassword, comparePassword } from "../../../../helpers/bcrypt.helper.js";
    import User from "../models/user.model.js";
    import { generateOTP } from "../../../../helpers/otp.helper.js";
    import { signToken } from "../../../../helpers/jwt.helper.js";
    import { sendOTPEmail } from "../../../../helpers/email.helper.js";


    class UserService {


    // Register User
        static async registerUserService({ username, email, password, roles = "user", avatar = null }) {
            // Step 1: Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error("User already exists with this email");

            // Step 2: Hash password
            const hashedPassword = await hashPassword(password);

            // Step 3: Generate OTP
            const otp = generateOTP();

            // Step 4: Save user in DB
            const user = await User.create({
            username,
            email,
            password: hashedPassword,
            roles,
            avatar,
            otp,
            });

            // Step 5: Return only safe data
            return {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            avatar: user.avatar,
            otp, // for sending via email/SMS later
            };
        }


    // Get All Users
            static async getAllUsersService() {
            const users = await User.find().select("-password -otp"); // exclude password & otp
            return users;
        }


    // verify-otp
    static async verifyOTPService({ email, otp }) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Check OTP
    if (user.otp !== otp) throw new Error("Invalid OTP");

    // Mark as verified
    user.isVerified = true;
    user.otp = null; // clear OTP after verification
    await user.save();

    return user;
    }

    // Login User
    static async loginService({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        // Optional: block login until email verified
        if (!user.isVerified) throw new Error("Please verify your email before logging in");

        const token = signToken({ id: user._id, roles: user.roles });

        // Return safe user & token
        return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            avatar: user.avatar,
            isVerified: user.isVerified ?? false,
            createdAt: user.createdAt,
        },
        };
    }

    // Logout User
    static async logoutService() {
        // nothing fancy, just return success message
        return { message: "✅ Logged out successfully" };
    }

    // sendOTP
    static async sendOTP(email) {
        if (!email) {
        throw new Error("Email is required");
        }

        const otp = generateOTP();

        const info = await sendOTPEmail(email, otp);

        return {
        otp, // keep only for dev/testing
        previewURL: info?.previewURL || null,
        };
    }

    //   Change Password
    static async changePasswordService(userId, oldPassword, newPassword) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) throw new Error("Old password is incorrect");

        user.password = await hashPassword(newPassword);
        await user.save();
    }

    // Request Reset (Send Otp to email)
  static async requestPasswordReset(email) {
  const user = await User.findOne({ email }); // ✅ fixed
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  user.otp = otp;
  await user.save();

  // ✅ TEMPORARY LOG (remove in production)
  console.log(`🔑 OTP for ${email}: ${otp}`);

  // still send email (you can disable this in dev)
  await sendOTPEmail(email, otp);

  return { message: "OTP generated and sent" };
}

// Reset passwordc using OTP
static async resetPasswordWithOTP(email, otp, newPassword) {
  const user = await User.findOne({ email }); // ✅ fixed
  if (!user) throw new Error("User not found");

  if (user.otp !== otp) throw new Error("Invalid or expired OTP");

  user.password = await hashPassword(newPassword);
  user.otp = null; // clear OTP after use
  await user.save();

  return { message: "Password reset successful" };
}


    }

        export default UserService;
