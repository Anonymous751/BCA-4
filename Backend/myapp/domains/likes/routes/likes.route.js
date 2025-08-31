import { Router } from "express";
import LikeController from "../controllers/likes.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";

const router = Router();

// Blog Like/Dislike
router.post("/blog/:blogId", requireAuth, LikeController.toggleBlogLike);

// Comment Like/Dislike
router.post("/comment/:commentId", requireAuth, LikeController.toggleCommentLike);

// Public: Get likes/dislikes for blog
router.get("/blog/:blogId", LikeController.getBlogLikes);

// Public: Get likes/dislikes for comment
router.get("/comment/:commentId", LikeController.getCommentLikes);

export default router;
