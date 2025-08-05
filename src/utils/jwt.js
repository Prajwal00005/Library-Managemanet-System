import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createJWT = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
};

const verifyJWT = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export { createJWT, verifyJWT };
