import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin", "user"], default: "user" },
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

