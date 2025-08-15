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
    .populate(
      "studentId",
      "studentID fullName email phoneNumber"
    );
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

export default {
  createBorrow,
  fetchBorrowStatistics,
};
