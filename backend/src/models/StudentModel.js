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
      unique: true
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
    parentGuardianName: {
      type: String,
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      enum: ["Engineering", "Science", "Arts and Humanities", "Commerce", "Medicine", "BCA", "BBS", "BBA", "BSc.IT"],
      required: true,
    },
    class: {
      type: String,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "7th Sem", ],
      required: true,
    },
    section: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },
    rollNumber: {
      type: String,
      trim: true,
    },
    admissionDate: {
      type: Date,
    },

    borrowingLimit: {
      type: Number,
      enum: [1, 2, 3, 4, 5], 
      default: 5,
    },
    accountStatus: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
