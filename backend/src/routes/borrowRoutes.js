import express from "express";
import borrowController from "../controllers/borrowController.js";

const router = express.Router();

router.post("/add", borrowController.processBorrowing);
router.get("/stats", borrowController.getBorrowStatistics);


export default router;
