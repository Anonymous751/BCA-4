import express from "express";
import UserController from "../controllers/user.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/send-otp", UserController.sendOTP);
router.post("/change-password", requireAuth, UserController.changePassword);
router.post("/request-password-reset", UserController.requestPasswordReset);
router.post("/reset-password", UserController.resetPasswordWithOTP);

router.post("/register", UserController.registerUser);
router.post("/verify-otp", UserController.verifyOTP);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/me", requireAuth, (req, res) => res.json({ me: req.user }));

router.get("/", UserController.getUsers);

export default router;
