import express from "express";
import studentController from "../controllers/studentController.js";
import  verify  from "../middleware/auth.js";
import { isAdmin, isStudent } from "../middleware/roleBasedAuth.js";

const router = express.Router();

router.post("/", verify, isAdmin, studentController.createStudent);
router.put("/:id", verify, isAdmin, studentController.updateStudent);
router.delete("/:id", verify, isAdmin, studentController.deleteStudent);
router.get("/", verify, isAdmin, studentController.getAllStudents);
router.get("/:id", verify, isAdmin, isStudent, studentController.getStudentById);
router.get("/stats/data", verify, isAdmin, studentController.getStudentStats);


export default router;
