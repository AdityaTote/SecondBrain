import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  profile_picture: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

export const User = models.User || model('User', userSchema);