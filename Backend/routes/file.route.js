import express from "express";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const router = express.Router();

let gfs;
mongoose.connection.once("open", () => {
  gfs = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads", // 👈 this should match your multer bucket name
  });
});

// GET /api/files/:filename
router.get("/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const filesColl = mongoose.connection.db.collection("uploads.files");
    const file = await filesColl.findOne({ _id: fileId });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set("Content-Type", file.contentType);

    const downloadStream = gfs.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on("error", () => {
      res.status(500).json({ error: "Error streaming file" });
    });
  } catch (err) {
    console.error("❌ Error fetching file:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;
