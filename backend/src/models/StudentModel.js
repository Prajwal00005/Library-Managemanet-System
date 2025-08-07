import mongoose from "mongoose";
import { ADMIN, STUDENT } from "../constants/roles.js";

const studentSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enum: [ADMIN, STUDENT],
      default: STUDENT,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
