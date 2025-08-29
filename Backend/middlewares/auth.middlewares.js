import { signToken, verifyToken } from "../helpers/jwt.helper.js";


export const requireAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.[process.env.COOKIE_NAME || "token"] ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = verifyToken(token);
    req.user = payload; // { id, roles }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
