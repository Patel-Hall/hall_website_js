import { Schema, model, models } from "mongoose";

const porSchema = new Schema({
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

const POR = models.POR || model("POR", porSchema);
export default POR;
