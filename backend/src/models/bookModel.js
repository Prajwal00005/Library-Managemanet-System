import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    bookNumber: {
      type: String,
      unique: [true, "Book Number cannot be same"],
      required: [true, "Book Number is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publication name is required"],
      trim: true,
    },
    coverImages: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Fiction",
          "Non-Fiction",
          "Science",
          "History",
          "Biography",
          "Textbook",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    faculty: {
      type: String,
      trim: true,
      required: [true, "Faculty is required"],
      enum: {
        values: [
          "BCA",
          "BBS",
          "Engineering",
          "Commerce",
          "Science",
          "Arts",
          "Business",
          "Medicine",
          "Law",
          "Other",
        ],
        message: "{VALUE} is not a valid faculty",
      },
    },
    class: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
      enum: {
        values: ["8", "9", "10", "11", "12", "Bachelor", "Master", "Other"],
        message: "{VALUE} is not a valid class",
      },
    },
    shelfNumber: {
      type: String,
      required: [true, "Shelf number is required"],
      trim: true,
    },
    totalCopies: {
      type: Number,
      required: [true, "Total copies is required"],
      min: [1, "Total copies must be at least 1"],
    },
    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      min: [0, "Available copies cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.totalCopies;
        },
        message: "Available copies cannot exceed total copies",
      },
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
