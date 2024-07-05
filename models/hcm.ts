import mongoose, { Schema, model, models } from "mongoose";

const hcmSchema = new Schema({
  post: {
    type: String,
    required: true,
    enum: [
      "Hall President",
      "Second Senate Member",
      "Student Auditor",
      "General Secretary",
      "Secretary",
    ],
  },
  portfolio: {
    type: String,
    default: "",
  },
  session: {
    type: String,
    required: true,
  },
});

const HCM = models.HCM || model("HCM", hcmSchema);
export default HCM;
