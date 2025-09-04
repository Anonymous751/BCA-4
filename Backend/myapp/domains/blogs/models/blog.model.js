import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: mongoose.Schema.Types.ObjectId, // GridFS file id
      ref: "uploads.files",
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
