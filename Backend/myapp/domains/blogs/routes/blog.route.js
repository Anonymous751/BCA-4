import express from "express";
import BlogController from "../controllers/blog.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";
import { requireRole } from "../../../../middlewares/role.middlewares.js";

const router = express.Router();

router.post("/create-blog", requireAuth, requireRole(["Author", "Admin"]), BlogController.createBlog);
router.get("/get-blogs", BlogController.getAllBlogs);
router.get("/user/:userId", BlogController.getBlogsByUser); // move up
router.get("/:id", BlogController.getBlogById); // after specific routes
router.put("/:id", requireAuth, requireRole(["Author", "Admin"]), BlogController.updateBlog);
router.delete("/:id", requireAuth, requireRole(["Author", "Admin"]), BlogController.deleteBlog);

export default router;
