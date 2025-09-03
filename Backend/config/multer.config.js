// config/multer.config.js
import multer from "multer";
import { GridFsStorage } from "@lenne.tech/multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import mongoose from "mongoose";

const storage = new GridFsStorage({
  db: mongoose.connection, // ✅ use same mongoose connection
  file: async (req, file) => {
    // allowed image types
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (!extname || !mimetype) {
      throw new Error("Only image files are allowed!");
    }

    // unique filename
    const buffer = await crypto.randomBytes(16);
    const filename = buffer.toString("hex") + path.extname(file.originalname);

    return {
      filename,
      bucketName: "uploads", // creates uploads.files + uploads.chunks
      metadata: { originalName: file.originalname },
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;
