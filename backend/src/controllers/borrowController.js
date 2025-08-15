import borrowService from "../services/borrowService.js";

const processBorrowing = async (req, res) => {
  try {
    const { bookNumber, studentID, borrowDate, dueDate } = req.body;

    if (!bookNumber || !studentID || !borrowDate || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const borrowing = await borrowService.createBorrow({
      bookNumber,
      studentID,
      borrowDate,
      dueDate,
    });

    return res.status(201).json({
      message: "Book borrowed successfully",
      borrowing,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBorrowStatistics = async (req, res) => {
  try {
    const stats = await borrowService.fetchBorrowStatistics();

    return res.status(200).json({
      message: "Borrow statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  processBorrowing,
  getBorrowStatistics,
};
