import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
