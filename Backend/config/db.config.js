// Backend/config/db.config.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket; // store GridFS bucket instance

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    gfsBucket = new GridFSBucket(conn.connection.db, {
      bucketName: "uploads", // matches your multer-gridfs bucket
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const getGFS = () => gfsBucket;

export { connectDB, getGFS };
