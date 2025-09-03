import dotenv from "dotenv";
dotenv.config();

import createError from "http-errors";
import express from "express";
import cors from "cors"
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import userRoutes from "../Backend/myapp/domains/users/routes/user.route.js";
import blogRoutes from "../Backend/myapp/domains/blogs/routes/blog.route.js";
import commentRoutes from "../Backend/myapp/domains/comments/routes/comment.route.js";
import likeRoutes from "../Backend/myapp/domains/likes/routes/likes.route.js";
import {connectDB} from "./config/db.config.js";
import fileRoutes from "./routes/file.route.js";


const app = express();

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
connectDB()
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes for server prefix
app.use("/api/users",  userRoutes)
app.use("/api/blogs",  blogRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/files", fileRoutes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//  global error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error response
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
