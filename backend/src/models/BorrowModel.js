import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Borrowed", "Returned", "Due Soon", "Overdue"],
      default: "Borrowed",
    },
  },
  { timestamps: true }
);

const Borrowing = mongoose.model("Borrowing", borrowingSchema);

export default Borrowing;
