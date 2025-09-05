// Backend/config/db.config.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket; // store GridFS bucket instance

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
=======
    const conn = await mongoose.connect(process.env.MONGO_URI);
>>>>>>> 68ee815 (AlMost-85)

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
