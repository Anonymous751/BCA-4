import BlogService from "../services/blog.services.js";
import Blog from "../models/blog.model.js";
import mongoose from "mongoose";
import Comment from "../../comments/models/comment.model.js";
import Like from "../../likes/models/likes.model.js";

class BlogController {
<<<<<<< HEAD

static async createBlog(req, res) {
  try {
    const data = {
      ...req.body,
      author: req.user.id,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [], // if tags come as JSON string
      coverImage: req.file ? req.file.id : null,            // 👈 save file ID
    };
    console.log("FILE:", req.file);  

    const blog = await BlogService.createBlogService(data);
    return res.status(201).json({ message: "Blog created successfully ✅", blog });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
=======
  /**
   * Create a new blog
   * @route POST /api/blogs
   * @access Private
   */
  static async createBlog(req, res) {
    try {
      const data = {
        ...req.body,
        author: req.user.id,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        coverImage: req.file ? req.file.id : null,
      };

      const blog = await BlogService.createBlogService(data);

      return res
        .status(201)
        .json({ message: "Blog created successfully ✅", blog });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Get all blogs with optional filters and pagination
   * @route GET /api/blogs
   * @access Public
   */
>>>>>>> 68ee815 (AlMost-85)
  static async getAllBlogs(req, res) {
    try {
      const { page, limit, sortBy, tags } = req.query;

      const blogs = await BlogService.getAllBlogsService({
        page,
        limit,
        sortBy,
        tags: tags?.split(",") || [],
      });

      return res.status(200).json({ blogs });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Get blog by ID
   * @route GET /api/blogs/:id
   * @access Public
   */
  static async getBlogById(req, res) {
    try {
      const blog = await BlogService.getBlogByIdService(req.params.id);
      return res.status(200).json({ blog });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  /**
   * Update blog by ID (only author or admin)
   * @route PUT /api/blogs/:id
   * @access Private
   */
  static async updateBlog(req, res) {
    try {
      const blog = await BlogService.updateBlogService(
        req.params.id,
        req.user.id,
        req.user.roles,
        req.body
      );

      return res
        .status(200)
        .json({ message: "Blog updated successfully ✅", blog });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }

  /**
   * Delete blog by ID (only author or admin)
   * @route DELETE /api/blogs/:id
   * @access Private
   */
  static async deleteBlog(req, res) {
    try {
      const result = await BlogService.deleteBlogService(
        req.params.id,
        req.user.id,
        req.user.roles
      );

      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }

  /**
   * Get blogs of logged-in user
   * Includes dynamic counts for comments, likes, dislikes
   * @route GET /api/blogs/my-blogs
   * @access Private
   */
  static async getMyBlogs(req, res) {
    try {
      const userId = req.user.id;

      // Validate user ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Fetch all blogs by user, sorted by newest first
      const blogs = await Blog.find({ author: userId })
        .sort({ createdAt: -1 })
        .lean();

      // Add dynamic stats for each blog
      for (let blog of blogs) {
        // Count comments
        blog.commentsCount = await Comment.countDocuments({ blogId: blog._id });

        // Count likes and dislikes
        const likes = await Like.find({ blogId: blog._id }).lean();
        blog.likesCount = likes.filter((l) => l.type === "Like").length;
        blog.dislikesCount = likes.filter((l) => l.type === "Dislike").length;
      }

      return res.status(200).json({ blogs });
    } catch (err) {
      console.error("🔥 getMyBlogs error:", err.message);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

export default BlogController;

