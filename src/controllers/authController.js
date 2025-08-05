import authService from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";

const login = async (req, res) => {
  try {
    const { email, studentId, password } = req.body;

    if (!password || (!email && !studentId)) {
      return res
        .status(400)
        .json({ message: "Email or student ID and password are required" });
    }

    const response = await authService.login({ email, studentId, password });

    const payload = {
      id: response._id,
      studentId: response.studentID,
      email: response.email,
      name: response.fullName,
      role: response.roles,
    };

    const token = createJWT(payload);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      data: payload,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(400).json({ message: e.message });
  }
};

export default { login };
