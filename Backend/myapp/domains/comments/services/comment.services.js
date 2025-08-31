import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

class CommentService {
  // Add comment
  static async addComment({ blogId, userId, text }) {
    const comment = new Comment({ blogId, userId, text });
    return await comment.save();
  }

  // Get comments for a blog with user info
  static async getCommentsByBlog(blogId) {
    return await Comment.aggregate([
      { $match: { blogId: new mongoose.Types.ObjectId(blogId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          text: 1,
          createdAt: 1,
          updatedAt: 1,
          "user._id": 1,
          "user.name": 1,
          "user.email": 1,
          "user.role": 1,
        },
      },
    ]);
  }

  // Find single comment
  static async findById(id) {
    return await Comment.findById(id);
  }

  // Update comment
  static async updateComment(id, text) {
    return await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true, runValidators: true }
    );
  }

  // Delete comment
  static async deleteComment(id) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default CommentService;
