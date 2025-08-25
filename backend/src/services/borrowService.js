import Book from "../models/bookModel.js";
import Student from "../models/StudentModel.js";
import Borrowing from "../models/BorrowModel.js";

const createBorrow = async ({ bookNumber, studentID, borrowDate, dueDate }) => {
  const book = await Book.findOne({ bookNumber });
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies <= 0) {
    throw new Error("No copies available");
  }

  const student = await Student.findOne({ studentID });
  if (!student) {
    throw new Error("Student not found");
  }

  const borrowing = await Borrowing.create({
    bookId: book._id,
    studentId: student._id,
    borrowDate,
    dueDate,
    status: "Borrowed",
  });

  book.availableCopies -= 1;
  await book.save();

  return await Borrowing.findById(borrowing._id)
    .populate(
      "bookId",
      "title author category class faculty shelfNumber availableCopies totalCopies bookNumber publisher"
    )
    .populate("studentId", "studentID fullName email phoneNumber");
};

const fetchBorrowStatistics = async () => {
  try {
    const today = new Date();
    const overdueCutoffDate = new Date();
    overdueCutoffDate.setDate(today.getDate() - 14);

    const totalBooks = await Book.countDocuments();

    const currentlyBorrowedCount = await Borrowing.countDocuments({
      status: "Borrowed",
    });

    const dueSoonCount = await Borrowing.countDocuments({
      status: "Borrowed",
      dueDate: {
        $gte: today,
        $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const overdueCount = await Borrowing.countDocuments({
      status: "Borrowed",
      dueDate: { $lt: overdueCutoffDate },
    });

    return {
      totalBooks,
      currentlyBorrowedCount,
      dueSoonCount,
      overdueCount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Borrowings
const getAllBorrowings = async (queryParams) => {
  const { studentId, bookId, status, className, faculty } = queryParams;

  let filters = {};

  if (studentId) filters.studentId = studentId;
  if (bookId) filters.bookId = bookId;
  if (status) filters.status = status;
  if (className) filters.className = className;
  if (faculty) filters.faculty = faculty;

  return Borrowing.find(filters);
};

// Get Borrowing by ID
const getBorrowingById = async (id) => {
  return Borrowing.findById(id);
};

// Update Borrowing
const updateBorrowing = async (id, updateData) => {
  const borrowing = await Borrowing.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!borrowing) {
    return null;
  }

  const today = new Date();
  const dueDate = new Date(borrowing.dueDate);

  if (borrowing.status === "Borrowed") {
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      borrowing.status = "Overdue";
    } else if (diffDays <= 3) {
      borrowing.status = "Due Soon";
    }

    await borrowing.save();
  }

  return borrowing;
};

// Delete Borrowing
const deleteBorrowing = async (id) => {
  return Borrowing.findByIdAndDelete(id);
};

// Settle Borrowing
const settleBorrow = async (borrowId) => {
  const borrow = await Borrowing.findById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  const book = await Book.findById(borrow.book);

  if (!book) {
    throw new Error("Book not found for this borrow record");
  }

  book.availableBooks += 1;
  await book.save();

  await Borrowing.findByIdAndDelete(borrowId);

  return { message: "Borrow settled successfully, book returned" };
};

export default {
  createBorrow,
  fetchBorrowStatistics,
  getAllBorrowings,
  getBorrowingById,
  updateBorrowing,
  deleteBorrowing,
  settleBorrow,
};
