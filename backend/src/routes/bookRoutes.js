import express from "express";
import { isAdmin } from "../middleware/roleBasedAuth.js";
import bookController from "../controllers/bookController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/books", auth, isAdmin, bookController.createBook);
router.get("/books", auth, bookController.getBooks);
router.get("/book/:id", auth, bookController.getBook);
router.patch("/book/:id", auth, isAdmin, bookController.updateBook);
router.delete("/book/:id", auth, isAdmin, bookController.deleteBook);
router.get("/categories", auth, bookController.getCategories);
router.get("/faculties", auth, bookController.getFaculties);
router.get("/classes", auth, bookController.getClasses);
router.get("/book-statistics", auth, bookController.getBookStatisticsData);

export default router;
