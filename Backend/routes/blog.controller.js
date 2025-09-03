// routes/blog.controller.js
import mongoose from "mongoose";
import { getGFS } from "../config/db.config.js";

export const getCoverImage = async (req, res) => {
  try {
    const gfsBucket = getGFS();
    if (!gfsBucket) return res.status(500).json({ error: "GridFS not initialized" });

    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);

    const files = await gfsBucket.find({ _id }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: "Cover image not found" });
    }

    const file = files[0];
    res.set("Content-Type", file.contentType);

    const downloadStream = gfsBucket.openDownloadStream(_id);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error serving cover image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
