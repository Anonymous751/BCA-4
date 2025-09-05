// Importing helper functions for password hashing, OTP generation, JWT signing, and email sending
import {
  hashPassword,
  comparePassword,
} from "../../../../helpers/bcrypt.helper.js";
import User from "../models/user.model.js";
import { generateOTP } from "../../../../helpers/otp.helper.js";
import { signToken } from "../../../../helpers/jwt.helper.js";
import { sendOTPEmail } from "../../../../helpers/email.helper.js";

class UserService {
  // Register User
<<<<<<< HEAD
<<<<<<< HEAD
static async registerUserService({ username, email, password, roles = ["Reader"], avatar = null }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists with this email");

  const hashedPassword = await hashPassword(password);
  const otp = generateOTP();

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    roles,
    avatar,   // 👈 stores GridFS ObjectId
    otp,
    otpResendCount: 0,
    isBlocked: false,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    avatar: user.avatar, // GridFS ObjectId
    otp,
  };
}



  // Verify OTP
=======
=======
>>>>>>> 68ee815 (AlMost-85)
  static async registerUserService({ username, email, password, roles = ["Reader"], avatar = null }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists with this email");

    // Hash password and generate OTP
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles,
      avatar,  // Store GridFS ObjectId for avatar
      otp,
      otpResendCount: 0,
      isBlocked: false,
    });

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar, // Store avatar (GridFS ObjectId)
      otp,
    };
  }

  // Verify OTP during user registration or reset
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
  static async verifyOTPService({ email, otp }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.otp !== otp) throw new Error("Invalid OTP");

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return user;
  }

  // User Login Service
  static async loginService({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if (!user.isVerified) throw new Error("Please verify your email before logging in");
    if (user.isBlocked) throw new Error("Account blocked due to too many OTP requests");

    const token = signToken({ id: user._id, roles: user.roles });

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

<<<<<<< HEAD
<<<<<<< HEAD

// Get all user ?
static async getAllUsersService() {
  const users = await User.find().select("-password -otp");
  return users;
}

// Get User use Id 
static getUserByIdService = async (id) => {
  return await User.findById(id).select("-password"); // exclude password
};

// Update User
static async updateUser(userId, data) {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true, // return updated doc
=======
=======
>>>>>>> 68ee815 (AlMost-85)
  // Get all users
  static async getAllUsersService() {
    const users = await User.find().select("-password -otp"); // Exclude sensitive fields
    return users;
  }

  // Get user by ID
  static getUserByIdService = async (id) => {
    return await User.findById(id).select("-password"); // Exclude password
  };

  // Update user information
  static async updateUser(userId, data) {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,  // Return updated document
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
      runValidators: true,
    });
    return updatedUser;
  }

  // Delete user
  static async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

<<<<<<< HEAD
<<<<<<< HEAD


  // Logout User
=======
  // Logout User (remove token)
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
  // Logout User (remove token)
>>>>>>> 68ee815 (AlMost-85)
  static async logoutService() {
    return { message: "✅ Logged out successfully" };
  }

  // Send OTP to email for registration or password reset
  static async sendOTP(email) {
    if (!email) throw new Error("Email is required");

    const otp = generateOTP();
    const info = await sendOTPEmail(email, otp);

    return {
      otp,
      previewURL: info?.previewURL || null, // Optional: preview URL for email content
    };
  }

  // Resend OTP (with limit of 3 attempts)
  static async resendOTP(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.isBlocked) throw new Error("Account blocked due to too many OTP requests");

    if (user.otpResendCount >= 3) {
      user.isBlocked = true;
      await user.save();
      throw new Error("Too many OTP requests. Account blocked");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpResendCount += 1;
    user.otpResendLast = new Date();
    await user.save();

    console.log(`🔄 Resent OTP for ${email}: ${otp}`);
    const info = await sendOTPEmail(email, otp);

    return {
      otp,
      attemptsLeft: 5 - user.otpResendCount,
      previewURL: info?.previewURL || null,
    };
  }

  // Change password (old to new)
  static async changePasswordService(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    user.password = await hashPassword(newPassword);
    await user.save();
  }

  // Request password reset OTP
  static async requestPasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.isBlocked) throw new Error("Account blocked due to too many OTP requests");

    const otp = generateOTP();
    user.otp = otp;
    user.otpResendCount = 0;
    await user.save();

    console.log(`🔑 OTP for ${email}: ${otp}`);
    await sendOTPEmail(email, otp);

    return { message: "OTP generated and sent" };
  }

  // Reset password using OTP
  static async resetPasswordWithOTP(email, otp, newPassword) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.isBlocked) throw new Error("Account blocked due to too many OTP requests");

    if (user.otp !== otp) throw new Error("Invalid or expired OTP");

    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpResendCount = 0;
    await user.save();

    return { message: "Password reset successful" };
  }

  // Get logged-in user's profile
  static async getUserProfile(userId) {
    const user = await User.findById(userId).select("-password -otp"); // Exclude sensitive info
    if (!user) throw new Error("User not found");
    if (user.isBlocked) throw new Error("Your account is blocked");
    return user;
  }

<<<<<<< HEAD
<<<<<<< HEAD
  // User profile update
// Update Profile Service
static async updateProfileService({ userId, updateData, requesterRoles }) {
  console.log("🔧 updateProfileService called →", { userId, updateData, requesterRoles });

  // ✅ userId will now be a proper string
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // update fields
  Object.assign(user, updateData);
  await user.save();

  return user.toObject();
}

// Admin-only: Update roles of any user
static async updateUserRolesService(userId, roles) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Update roles
  user.roles = roles;
  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    roles: user.roles,
    isVerified: user.isVerified,
  };
}



=======
  // Update profile for logged-in user
  static async updateProfileService({ userId, updateData, requesterRoles }) {
    console.log("🔧 updateProfileService called →", { userId, updateData, requesterRoles });

=======
  // Update profile for logged-in user
  static async updateProfileService({ userId, updateData, requesterRoles }) {
    console.log("🔧 updateProfileService called →", { userId, updateData, requesterRoles });

>>>>>>> 68ee815 (AlMost-85)
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Apply changes
    Object.assign(user, updateData);
    await user.save();

    return user.toObject();
  }

  // Admin-only: Update roles of a user
  static async updateUserRolesService(userId, roles) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Update user roles
    user.roles = roles;
    await user.save();

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      roles: user.roles,
      isVerified: user.isVerified,
    };
  }
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
}

export default UserService;
