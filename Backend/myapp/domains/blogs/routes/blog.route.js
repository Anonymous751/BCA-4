import getCoverImage  from "../../../../routes/blog.controller.js";
import express from "express";
import BlogController from "../controllers/blog.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";
import { requireRole } from "../../../../middlewares/role.middlewares.js";
import upload from "../../../../config/multer.config.js";

const router = express.Router();

router.post(
  "/create-blog",
  upload.single("coverImage"),  
  requireAuth,
  requireRole(["Author", "Admin"]),
  BlogController.createBlog
);

router.get("/get-blogs", BlogController.getAllBlogs);
router.get("/user/:userId", BlogController.getBlogsByUser);

// ⚡ fix: cover route must come before :id
router.get("/cover/:id", getCoverImage);

router.get("/:id", BlogController.getBlogById);
router.put("/:id", requireAuth, requireRole(["Author", "Admin"]), BlogController.updateBlog);
router.delete("/:id", requireAuth, requireRole(["Author", "Admin"]), BlogController.deleteBlog);
export default router;
