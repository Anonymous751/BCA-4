import getCoverImage  from "../../../../routes/blog.controller.js";
import express from "express";
import BlogController from "../controllers/blog.controller.js";
import getCoverImage from "../../../../routes/blog.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";
import { requireRole } from "../../../../middlewares/role.middlewares.js";
import upload from "../../../../config/multer.config.js";

const router = express.Router();

<<<<<<< HEAD
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
=======
// =====================
// CREATE BLOG
// =====================
router.post(
  "/create-blog",
  upload.single("coverImage"),               // handle cover image upload
  requireAuth,                               // ensure user is logged in
  requireRole(["Author", "Admin"]),          // only Authors/Admins can create
  BlogController.createBlog
);

// =====================
// READ BLOGS
// =====================
router.get("/get-blogs", BlogController.getAllBlogs);  // get all blogs

// ⚡ SPECIFIC ROUTES FIRST ⚡

// Get blogs of the logged-in user
router.get("/my-blogs", requireAuth, BlogController.getMyBlogs);

// Get cover image for a specific blog
router.get("/cover/:id", getCoverImage);

// =====================
// DYNAMIC / CATCH-ALL ROUTE
// Must be last among GET routes with parameters
// =====================
// Get blog details by blog ID
router.get("/:id", BlogController.getBlogById);

// =====================
// UPDATE & DELETE BLOGS
// =====================
router.put(
  "/:id",
  requireAuth,
  requireRole(["Author", "Admin"]),
  BlogController.updateBlog
);

router.delete(
  "/:id",
  requireAuth,
  requireRole(["Author", "Admin"]),
  BlogController.deleteBlog
);

>>>>>>> 68ee815 (AlMost-85)
export default router;
