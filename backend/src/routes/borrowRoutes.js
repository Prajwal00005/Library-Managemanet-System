import express from "express";
import borrowController from "../controllers/borrowController.js";

const router = express.Router();

router.post("/add", borrowController.processBorrowing);
router.get("/stats", borrowController.getBorrowStatistics);

router.get("/", borrowController.getAllBorrowings); // Display all
router.get("/:id", borrowController.getBorrowingById); // Get by ID
router.put("/:id", borrowController.updateBorrowing); // Update
router.delete("/:id", borrowController.deleteBorrowing); // Delete
router.put("/settle/:id", borrowController.settleBorrowing); // Settle

export default router;
