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
    },
  ],
});

const Patelian = models.Patelian || model("Patelian", patelianSchema);
export default Patelian;
