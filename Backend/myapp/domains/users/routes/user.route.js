import express from "express";
import UserController from "../controllers/user.controller.js";
import { requireAdmin, requireAuth } from "../../../../middlewares/auth.middlewares.js";
import upload from "../../../../config/multer.config.js";
import { getAvatar } from "../../../../routes/file.controller.js";
<<<<<<< HEAD
import { getCoverImage } from "../../../../routes/blog.controller.js";

=======


>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
const router = express.Router();

// =======================
// USER AUTH ROUTES
// =======================
router.post("/register", upload.single("avatar"), UserController.registerUser);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/verify-otp", UserController.verifyOTP);
router.post("/resend-otp", UserController.resendOTP);
router.post("/request-password-reset", UserController.requestPasswordReset);
router.post("/reset-password", UserController.resetPasswordWithOTP);

// =======================
// PROFILE ROUTES
// =======================
router.get("/logged-in-user-profile", requireAuth, UserController.getLoggedInUser);
router.put("/update-user-profile", requireAuth, upload.single("avatar"), UserController.updateProfile);
router.put("/update-user-roles", requireAuth, UserController.updateUserRoles);

// =======================
// DASHBOARD ROUTE (must be before dynamic :id)
// =======================
router.get("/dashboard", requireAuth, UserController.getDashboardStats);

// =======================
// STATIC & DYNAMIC USER ROUTES
// =======================
router.get("/all", UserController.getUsers);
router.get("/avatar/:id", getAvatar);
router.get("/:id", UserController.getUserById);
router.put("/:id", requireAuth, UserController.updateUser);
router.delete("/:id", requireAuth, UserController.deleteUser);

export default router;
