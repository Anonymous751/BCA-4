import { Router } from "express";
import CommentController from "../controllers/comment.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";

const router = Router();

// POST - add comment
router.post("/", requireAuth, CommentController.addComment);

// GET - all comments for a blog
router.get("/blog/:blogId", CommentController.getComments);

// PUT - update comment (only author or admin)
router.put("/:id", requireAuth, CommentController.updateComment);

// DELETE - delete comment (only author or admin)
router.delete("/:id", requireAuth, CommentController.deleteComment);

export default router;
