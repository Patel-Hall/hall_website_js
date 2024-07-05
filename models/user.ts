import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: "student",
      enum: ["HCM", "admin", "boarder"],
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "HCM",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
