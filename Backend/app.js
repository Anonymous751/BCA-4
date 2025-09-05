// 1. Environment Configuration
import dotenv from "dotenv";
dotenv.config();

// 2. Core Dependencies
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 3. Custom Modules
import { connectDB } from "./config/db.config.js";
import userRoutes from "../Backend/myapp/domains/users/routes/user.route.js";
import blogRoutes from "../Backend/myapp/domains/blogs/routes/blog.route.js";
import commentRoutes from "../Backend/myapp/domains/comments/routes/comment.route.js";
import likeRoutes from "../Backend/myapp/domains/likes/routes/likes.route.js";
<<<<<<< HEAD
<<<<<<< HEAD
import {connectDB} from "./config/db.config.js";
import fileRoutes from "./routes/file.route.js";

=======
import fileRoutes from "./routes/file.route.js";
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)

=======
import fileRoutes from "./routes/file.route.js";

>>>>>>> 68ee815 (AlMost-85)
// 4. App Initialization
const app = express();

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

=======

>>>>>>> 68ee815 (AlMost-85)
// 5. Database Connection
connectDB();

// 6. Middleware Configuration
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend URL
  credentials: true,               // Allow cookies
}));


app.use(logger("dev"));  // HTTP request logger
app.use(express.json());  // Parse JSON requests
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded data
app.use(cookieParser());  // Parse cookies
app.use(express.static(path.join(__dirname, "public")));  // Serve static files


// 7. Routes Setup
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/files", fileRoutes);

// 8. 404 Error Handling (Route Not Found)
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
app.use((req, res, next) => {
  next(createError(404));  // Forward to error handler
});

// 9. Global Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;  // Error message
  res.locals.error = req.app.get("env") === "development" ? err : {};  // Detailed error in dev environment

  // Send error response
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
