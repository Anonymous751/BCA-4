import Blog from "../models/blog.model.js";

import mongoose from "mongoose";

class BlogService {

  // Create a new blog
  static async createBlogService(data) {
    const blog = await Blog.create(data);
    return blog;
  }

  // Get all blogs with author info + pagination, sorting, filtering by tag
  static async getAllBlogsService({ page = 1, limit = 10, sortBy = "createdAt", tags = [] }) {
    const query = tags.length ? { tags: { $in: tags } } : {};
    const skip = (page - 1) * limit;

    const blogs = await Blog.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo"
        }
      },
      { $unwind: "$authorInfo" },
      { $sort: { [sortBy]: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      { $project: { "authorInfo.password": 0, "authorInfo.otp": 0 } }
    ]);

    return blogs;
  }

  // Get single blog by ID with public comments and likes
  static async getBlogByIdService(blogId) {
    if (!mongoose.Types.ObjectId.isValid(blogId)) throw new Error("Invalid blog ID");

    const blog = await Blog.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(blogId) } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo"
        }
      },
      { $unwind: "$authorInfo" },

      // Comments aggregation
      {
        $lookup: {
          from: "comments",
          let: { blogId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo"
              }
            },
            { $unwind: "$userInfo" },
            {
              $project: {
                text: 1,
                createdAt: 1,
                "userInfo._id": 1,
                "userInfo.username": 1,
                "userInfo.avatar": 1
              }
            }
          ],
          as: "comments"
        }
      },

      // Likes count
      {
        $lookup: {
          from: "likes",
          let: { blogId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$blogId", "$$blogId"] }, { $eq: ["$type", "Like"] }] } } },
            { $count: "likeCount" }
          ],
          as: "likesData"
        }
      },
      {
        $addFields: {
          likeCount: { $ifNull: [{ $arrayElemAt: ["$likesData.likeCount", 0] }, 0] }
        }
      },
      { $project: { likesData: 0 } }
    ]);

    if (!blog || blog.length === 0) throw new Error("Blog not found");
    return blog[0];
  }

  // Update blog (only author or Admin)
  static async updateBlogService(blogId, userId, userRoles, updateData) {
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    if (!userRoles.includes("Admin") && blog.author.toString() !== userId) {
      throw new Error("Unauthorized to update this blog");
    }

    Object.assign(blog, updateData);
    await blog.save();
    return blog;
  }

  // Delete blog (only author or Admin)
  static async deleteBlogService(blogId, userId, userRoles) {
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    if (!userRoles.includes("Admin") && blog.author.toString() !== userId) {
      throw new Error("Unauthorized to delete this blog");
    }

   await Blog.findByIdAndDelete(blogId);
    return { message: "Blog deleted successfully" };
  }

  // Get all blogs by a specific user
  static async getBlogsByUserService(userId) {
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    return blogs;
  }
}

export default BlogService;
