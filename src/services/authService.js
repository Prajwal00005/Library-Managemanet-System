import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

const login = async ({ email, studentId, password }) => {
  try {
    // Find user by email or studentId, exclude password
    const user = await Student.findOne({
      $or: [{ email: email }, { studentID: studentId }],
    });

    if (!user) throw new Error("User does not exist");

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) throw new Error("Incorrect password");

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default { login };
