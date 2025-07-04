import mongoose from "mongoose";

export default async () => {
  if (mongoose.connection.readyState >= 1) return;

  const config = useRuntimeConfig();
   console.log("MONGODB_URI:", config.MONGODB_URI);  // Debug ke liye
  await mongoose.connect(config.MONGODB_URI);
};
