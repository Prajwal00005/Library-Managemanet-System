import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createJWT = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1d" });
};

const verifyJWT = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

export { createJWT, verifyJWT };
