import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      //   john@example.com
      //   alex123@gmail.com
      //   my.name@domain.org
      //   abc@xyz.co.in
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    roles: {
      type: [String],
      enum: ["Author", "Reader", "Admin"],
      default: ["Reader"],
    },
    avatar: {
      type: String, // URL or file path
      trim: true,
    },
    otp: {
      type: Number,
      min: 100000, // 6-digit minimum
      max: 999999, // 6-digit maximum
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpResendCount: { type: Number, default: 0 },
    otpResendLast: { type: Date, default: null },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
