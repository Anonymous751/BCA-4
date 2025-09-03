// routes/file.controller.js
import mongoose from "mongoose";
import { getGFS } from "../config/db.config.js";

export const getAvatar = async (req, res) => {
  try {
    const gfsBucket = getGFS();
    if (!gfsBucket) return res.status(500).json({ error: "GridFS not initialized" });

    const { id } = req.params;
    console.log("Avatar request for user:", id);

    // Convert id to ObjectId
    const _id = new mongoose.Types.ObjectId(id);

    // Find the file in GridFS
    const files = await gfsBucket.find({ _id }).toArray();
    if (!files || files.length === 0) {
      console.log("No avatar found for:", id);
      return res.status(404).json({ error: "Avatar not found" });
    }

    const file = files[0];
    res.set("Content-Type", file.contentType);

    // Stream file
    const downloadStream = gfsBucket.openDownloadStream(_id);
    downloadStream.pipe(res);

    console.log("Serving avatar:", file.filename);
  } catch (err) {
    console.error("Error serving avatar:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
