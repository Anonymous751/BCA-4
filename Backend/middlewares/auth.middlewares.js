import { verifyToken } from "../helpers/jwt.helper.js";
import User from "../myapp/domains/users/models/user.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔹 Incoming Authorization header:", authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("❌ Missing or malformed Authorization header");
      return res.status(401).json({ error: "Unauthorized. Token missing" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔹 Extracted token:", token);

    let payload;
    try {
      payload = verifyToken(token);
      console.log("✅ Decoded payload:", payload);
    } catch (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token" });
    }

    const user = await User.findById(payload.id).select("-password");
    console.log("🔹 User found in DB:", user);

    if (!user) {
      console.log("❌ No user found with id:", payload.id);
      return res.status(401).json({ error: "Unauthorized. User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ General auth error:", err.message);
    return res.status(401).json({ error: "Unauthorized. Invalid or expired token" });
  }
};


export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.roles?.includes("admin") === false) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
