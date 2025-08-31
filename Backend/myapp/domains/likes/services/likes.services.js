import Like from "../models/likes.model.js";

class LikeService {
  // Toggle like/dislike for Blog
  static async toggleBlogLike(userId, blogId, type) {
    const existing = await Like.findOne({ userId, blogId });

    if (existing) {
      if (existing.type === type) {
        // same reaction → remove (unlike)
        await Like.findByIdAndDelete(existing._id);
        return { status: "removed" };
      } else {
        // update from Like → Dislike OR Dislike → Like
        existing.type = type;
        await existing.save();
        return { status: "updated", type };
      }
    } else {
      const like = new Like({ userId, blogId, type });
      await like.save();
      return { status: "added", type };
    }
  }

  // Toggle like/dislike for Comment
  static async toggleCommentLike(userId, commentId, type) {
    const existing = await Like.findOne({ userId, commentId });

    if (existing) {
      if (existing.type === type) {
        await Like.findByIdAndDelete(existing._id);
        return { status: "removed" };
      } else {
        existing.type = type;
        await existing.save();
        return { status: "updated", type };
      }
    } else {
      const like = new Like({ userId, commentId, type });
      await like.save();
      return { status: "added", type };
    }
  }

  // Get likes for blog
  static async getBlogLikes(blogId) {
    return await Like.find({ blogId }).populate("userId", "name email role");
  }

  // Get likes for comment
  static async getCommentLikes(commentId) {
    return await Like.find({ commentId }).populate("userId", "name email role");
  }
}

export default LikeService;
