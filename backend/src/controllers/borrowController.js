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

// Get All Borrowings
const getAllBorrowings = async (req, res) => {
  try {
    const borrowings = await borrowService.getAllBorrowings(req.query);

    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Borrowing by ID
const getBorrowingById = async (req, res) => {
  try {
    const borrowing = await borrowService.getBorrowingById(req.params.id);

    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing not found" });
    }

    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Borrowing
const updateBorrowing = async (req, res) => {
  try {
    const borrowing = await borrowService.updateBorrowing(
      req.params.id,
      req.body
    );

    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing not found" });
    }

    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Borrowing
const deleteBorrowing = async (req, res) => {
  try {
    const borrowing = await borrowService.deleteBorrowing(req.params.id);

    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing not found" });
    }

    res.status(200).json({ message: "Borrowing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Settle Borrowing
const settleBorrowing = async (req, res) => {
  try {
    await borrowService.settleBorrow(req.params.id);

    res
      .status(200)
      .json({ message: "Borrow settled successfully, book returned" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  processBorrowing,
  getBorrowStatistics,
  getAllBorrowings,
  getBorrowingById,
  updateBorrowing,
  deleteBorrowing,
  settleBorrowing,
};
