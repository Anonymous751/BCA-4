import express from "express";
import UserController from "../controllers/user.controller.js";
import { requireAuth } from "../../../../middlewares/auth.middlewares.js";
const router = express.Router();
console.log(UserController);

router.post("/resend-otp", UserController.resendOTP);
router.post("/change-password", requireAuth, UserController.changePassword);
router.post("/request-password-reset", UserController.requestPasswordReset);
router.post("/reset-password", UserController.resetPasswordWithOTP);

router.post("/register", UserController.registerUser);
router.post("/verify-otp", UserController.verifyOTP);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

router.put("/update-user-profile", requireAuth, UserController.updateProfile);
router.put("/update-user-roles", requireAuth, UserController.updateUserRoles);

router.get("/all", UserController.getUsers);
router.get("/logged-in-user-profile", requireAuth, UserController.getLoggedInUser);
export default router;
