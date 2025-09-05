// routes/blog.controller.js
import mongoose from "mongoose";
import { getGFS } from "../config/db.config.js";

<<<<<<< HEAD
<<<<<<< HEAD
export const getCoverImage = async (req, res) => {
  try {
    const gfsBucket = getGFS();
    if (!gfsBucket) return res.status(500).json({ error: "GridFS not initialized" });

    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);

    const files = await gfsBucket.find({ _id }).toArray();
    if (!files || files.length === 0) {
=======
=======
>>>>>>> 68ee815 (AlMost-85)
const getCoverImage = async (req, res) => {
  try {
    const gfsBucket = getGFS();
    if (!gfsBucket) {
      console.error("❌ GridFS not initialized");
      return res.status(500).json({ error: "GridFS not initialized" });
    }

    const { id } = req.params;
    console.log("📥 Requested cover ID:", id);

    let _id;
    try {
      _id = new mongoose.Types.ObjectId(id);
    } catch (err) {
      console.error("❌ Invalid ObjectId:", id);
      return res.status(400).json({ error: "Invalid file ID" });
    }

    let files;
    try {
      files = await gfsBucket.find({ _id }).toArray();
    } catch (err) {
      console.error("❌ Error querying GridFS:", err);
      return res.status(500).json({ error: "Error querying GridFS" });
    }

    console.log("🔎 Files found:", files);

    if (!files || files.length === 0) {
      console.warn("⚠️ No file found for ID:", id);
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
      return res.status(404).json({ error: "Cover image not found" });
    }

    const file = files[0];
<<<<<<< HEAD
<<<<<<< HEAD
    res.set("Content-Type", file.contentType);

    const downloadStream = gfsBucket.openDownloadStream(_id);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error serving cover image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
=======
=======
>>>>>>> 68ee815 (AlMost-85)
    console.log("✅ Serving file:", {
      filename: file.filename,
      contentType: file.contentType,
      length: file.length,
    });

    res.set("Content-Type", file.contentType || "application/octet-stream");

    const downloadStream = gfsBucket.openDownloadStream(_id);
    downloadStream.on("error", (err) => {
      console.error("❌ Error streaming file:", err);
      res.status(500).json({ error: "Error streaming file" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("❌ Unexpected error in getCoverImage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getCoverImage;
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
