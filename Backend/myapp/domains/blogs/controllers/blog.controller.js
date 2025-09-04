import BlogService from "../services/blog.services.js";

class BlogController {

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
  static async getAllBlogs(req, res) {
    try {
      const { page, limit, sortBy, tags } = req.query;
      const blogs = await BlogService.getAllBlogsService({ page, limit, sortBy, tags: tags?.split(",") || [] });
      return res.status(200).json({ blogs });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async getBlogById(req, res) {
    try {
      const blog = await BlogService.getBlogByIdService(req.params.id);
      return res.status(200).json({ blog });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  static async updateBlog(req, res) {
    try {
      const blog = await BlogService.updateBlogService(req.params.id, req.user.id, req.user.roles, req.body);
      return res.status(200).json({ message: "Blog updated successfully ✅", blog });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }

  static async deleteBlog(req, res) {
    try {
      const result = await BlogService.deleteBlogService(req.params.id, req.user.id, req.user.roles);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }

  static async getBlogsByUser(req, res) {
    try {
      const blogs = await BlogService.getBlogsByUserService(req.params.userId);
      return res.status(200).json({ blogs });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BlogController;

