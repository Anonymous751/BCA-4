import { verifyToken } from "../helpers/jwt.helper.js";
import User from "../myapp/domains/users/models/user.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.[process.env.COOKIE_NAME || "token"] ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token missing" });
    }

    const payload = verifyToken(token); // { id, roles }

    // 🔍 Fetch full user from DB
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized. User not found" });
    }

    req.user = user; // ✅ now contains full Mongo user with _id
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized. Invalid or expired token" });
  }
};
