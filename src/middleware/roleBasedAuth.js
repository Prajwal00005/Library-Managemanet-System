import { ADMIN, STUDENT } from "../constants/roles.js";

// Middleware to authorize admin users
const isAdmin = async (req, res, next) => {
  try {
    if (req.req.user.role !== ADMIN) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Admin access required.",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error validating admin role. ",
    });
  }
};

// Middleware to authorize student users
const isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== STUDENT) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Student access required.",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error validating student role. ",
    });
  }
};

export { isAdmin, isStudent };
