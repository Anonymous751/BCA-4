import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    type: {
      type: String,
      enum: ["Like", "Dislike"],
      default: "Like",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
