import jwt from "jsonwebtoken";

export const signToken = (payload, options = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
    ...options,
  });
};

export const verifyToken = (token) => {
  if (!token || token.trim() === "") {
    throw new Error("Token missing");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};