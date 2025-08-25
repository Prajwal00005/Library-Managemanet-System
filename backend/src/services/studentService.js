import Student from "../models/StudentModel.js";
import mongoose from "mongoose";

// Create student
const createStudent = async (data) => {
  if (!data.studentID || !data.fullName || !data.email) {
    throw new Error("studentID, fullName, and email are required");
  }

  const existing = await Student.findOne({
    $or: [{ email: data.email }, { studentID: data.studentID }]
  });

  if (existing) {
    throw new Error("Student with given ID or Email already exists");
  }

  return await Student.create(data);
};

// Get students 
const getAllStudents = async (filters = {}, query = {}) => {
  const { faculty, status, name } = filters;
  const searchQuery = {};

  if (faculty) {
    searchQuery.faculty = faculty;
  }

  if (status) {
    searchQuery.accountStatus = status;
  }

  if (name) {
    searchQuery.fullName = { $regex: name, $options: "i" };
  }

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;

  return await Student.find(searchQuery)
    .skip((page - 1) * limit)
    .limit(limit);
};

// Get by ID
const getStudentById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid student ID");
  }

  return await Student.findById(id);
};

// Update student
const updateStudent = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid student ID");
  }

  const student = await Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

// Delete student
const deleteStudent = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid student ID");
  }

  return await Student.findByIdAndDelete(id);
};

// Stats
const getStudentStats = async () => {
  const totalStudents = await Student.countDocuments();
  const activeStudents = await Student.countDocuments({ accountStatus: "Active" });
  const withBorrowedBooks = await Student.countDocuments({ borrowingLimit: { $lt: 5 } });
  const faculties = await Student.distinct("faculty");

  return {
    totalStudents,
    activeStudents,
    withBorrowedBooks,
    totalFaculties: faculties.length,
  };
};

export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
};
