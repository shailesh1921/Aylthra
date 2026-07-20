import mongoose from 'mongoose';

// ─── Database Connection ───────────────────────────────
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI not set. Running server without MongoDB connection.');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

export default connectDB;
