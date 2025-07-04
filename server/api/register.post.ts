import connectDB from "@/server/utils/db";
import User from "@/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  await connectDB();

  console.log("DB connected");

  const body = await readBody(event);
  const { name, email, dob, password, confirmPassword } = body;

  if (!name || !email || !dob || !password || !confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: "All fields are required" });
  }

  if (password !== confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError({ statusCode: 400, statusMessage: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, dob, password: hashedPassword });

  return { message: "User registered successfully" };
});
