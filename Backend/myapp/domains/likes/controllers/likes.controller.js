import LikeService from "../services/likes.services.js";

class LikeController {
  // Blog like/dislike
  static async toggleBlogLike(req, res) {
    try {
      const { blogId } = req.params;
      const { type } = req.body; // "Like" or "Dislike"

      if (!["Like", "Dislike"].includes(type)) {
        return res.status(400).json({ error: "Invalid type. Must be Like or Dislike." });
      }

      const result = await LikeService.toggleBlogLike(req.user._id, blogId, type);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Comment like/dislike
  static async toggleCommentLike(req, res) {
    try {
      const { commentId } = req.params;
      const { type } = req.body;

      if (!["Like", "Dislike"].includes(type)) {
        return res.status(400).json({ error: "Invalid type. Must be Like or Dislike." });
      }

      const result = await LikeService.toggleCommentLike(req.user._id, commentId, type);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get blog likes/dislikes
  static async getBlogLikes(req, res) {
    try {
      const { blogId } = req.params;
      const likes = await LikeService.getBlogLikes(blogId);

      const summary = {
        total: likes.length,
        likes: likes.filter(l => l.type === "Like").length,
        dislikes: likes.filter(l => l.type === "Dislike").length,
      };

      res.status(200).json({ summary, users: likes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get comment likes/dislikes
  static async getCommentLikes(req, res) {
    try {
      const { commentId } = req.params;
      const likes = await LikeService.getCommentLikes(commentId);

      const summary = {
        total: likes.length,
        likes: likes.filter(l => l.type === "Like").length,
        dislikes: likes.filter(l => l.type === "Dislike").length,
      };

      res.status(200).json({ summary, users: likes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default LikeController;
