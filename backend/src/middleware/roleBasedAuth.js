import { ADMIN, STUDENT } from "../constants/roles.js";

// Middleware to authorize admin users
const isAdmin = async (req, res, next) => {
  if (req.user.role !== ADMIN) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Admin access required.",
    });
  }
  next();
};

// Middleware to authorize student users
const isStudent = async (req, res, next) => {
  if (req.user.role !== STUDENT) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Student access required.",
    });
  }
  next();
};

export { isAdmin, isStudent };
