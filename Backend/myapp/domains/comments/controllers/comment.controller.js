import CommentService from "../services/comment.services.js";

class CommentController {
  // Add comment
  static async addComment(req, res) {
    try {
      const { blogId, text } = req.body;
      if (!blogId || !text) {
        return res.status(400).json({ error: "blogId and text are required" });
      }

      const comment = await CommentService.addComment({
        blogId,
        userId: req.user._id, // from auth middleware
        text,
      });

      return res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get comments for blog
  static async getComments(req, res) {
    try {
      const { blogId } = req.params;
      const comments = await CommentService.getCommentsByBlog(blogId);

      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update comment
  static async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;

      const comment = await CommentService.findById(id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });

      // Only comment author or Admin can update
      if (
        comment.userId.toString() !== req.user._id.toString() &&
        req.user.role !== "Admin"
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updated = await CommentService.updateComment(id, text);
      return res.status(200).json({ message: "Comment updated", updated });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete comment
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await CommentService.findById(id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });

      // Only comment author or Admin can delete
      if (
        comment.userId.toString() !== req.user._id.toString() &&
        req.user.role !== "Admin"
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await CommentService.deleteComment(id);
      return res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default CommentController;
