import studentService from "../services/studentService.js";

const createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);

    res.status(201).json({
      message: "Student created successfully",
      data: student
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents(req.query, req.query);

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);

    res.status(200).json({
      message: "Student updated successfully",
      data: student
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudentStats = async (req, res) => {
  try {
    const stats = await studentService.getStudentStats();

    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
};
