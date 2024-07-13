import { Schema, model, models } from "mongoose";

const patelianSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  instiEmail: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    default: "",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "Boarder",
    enum: ["HCM", "Boarder", "Admin", "Tech Team", "Alumnus"],
  },
  roomNo: {
    type: String,
    default: "",
  },
  facebookProfile: {
    type: String,
    default: "",
  },
  linkedinProfile: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "POR",
    },
  ],
});

const Patelian = models.Patelian || model("Patelian", patelianSchema);
export default Patelian;
