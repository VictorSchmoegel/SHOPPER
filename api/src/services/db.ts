import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};