import { ADMIN } from "../constants/roles.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

const adminData = {
  studentID: "ADMIN001",
  fullName: "Admin User",
  email: "admin@university.edu",
  phoneNumber: "1234567890",
  address: "123 Admin Street",
  roles: ADMIN,
  password: "Admin@123",
};

const seedAdmin = async () => {
  try {
    const existingAdmin = await Student.findOne({
      $or: [{ email: adminData.email }, { studentID: adminData.studentID }],
    });

    if (existingAdmin) {
      console.log("Admin exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = bcrypt.hashSync(adminData.password);

    const { studentID, fullName, email, phoneNumber, address } = adminData;

    const admin = await Student.create({
      studentID,
      fullName,
      email,
      phoneNumber,
      address,
      roles: ADMIN,
      password: hashedPassword,
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default seedAdmin;
