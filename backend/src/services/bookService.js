import { BOOk_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import Book from "../models/bookModel.js";
import uploadFile from "../utils/cloudinaryUploader.js";
import promptGemini from "../utils/gemini.js";

const createBook = async (data, files) => {
  try {
    const existingBook = await Book.findOne({ bookNumber: data.bookNumber });

    if (existingBook) {
      throw new Error(
        `${existingBook.title} book existed with book Number ${data.bookNumber}`
      );
    }

    const promptMessage = BOOk_DESCRIPTION_PROMPT.replace(
      "%s",
      data.title
    ).replace("%s", data?.author);

    const formatedData = {
      title: data.title,
      author: data.author,
      description: data?.description ?? (await promptGemini(promptMessage)),
      bookNumber: data.bookNumber,
      publisher: data.publisher,
      category: data.category,
      faculty: data.faculty,
      class: data.classLevel,
      shelfNumber: data.shelfNumber,
      totalCopies: data.totalCopies,
      availableCopies: data.totalCopies,
      purchaseDate: data?.purchaseDate,
    };

    if (files && files.length > 0) {
      const uploadedFiles = await uploadFile(files);
      formatedData.coverImages = uploadedFiles.map((item) => item?.secure_url);
    }

    const createBook = await Book.create(formatedData);
    return createBook;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getBooks = async (query) => {
  try {
    const { name, faculty, classLevel, categories, limit, offset } = query;

    const sort = JSON.parse(query.sort || "{}");
    const filters = {};

    if (name) filters.title = { $regex: name, $options: "i" };
    if (faculty) filters.faculty = faculty;
    if (classLevel) filters.class = classLevel;
    if (categories) filters.category = { $in: categories.split(",") };

    const result = await Book.find(filters)
      .sort(sort)
      .limit(limit)
      .skip(offset);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getBook = async (id) => {
  try {
    return await Book.findById(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteBook = async (id) => {
  try {
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      throw new Error("Book unavailable to delete");
    }

    const result = await Book.findByIdAndDelete(id);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateBook = async (id, data, files) => {
  try {
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      throw new Error("Book unavailable to update");
    }

    const formatedData = {
      title: data?.title,
      author: data?.author,
      description: data?.description,
      bookNumber: data?.bookNumber,
      publisher: data?.publisher,
      category: data?.category,
      faculty: data?.faculty,
      class: data?.classLevel,
      shelfNumber: data?.shelfNumber,
      totalCopies: data?.totalCopies,
      availableCopies: data?.totalCopies,
      purchaseDate: data?.purchaseDate,
    };

    if (files && files.length > 0) {
      const uploadedFiles = await uploadFile(files);
      formatedData.coverImages = uploadedFiles.map((item) => item?.secure_url);
    }

    const result = await Book.findByIdAndUpdate(id, formatedData, {
      new: true,
    });

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getEnumValues = (fieldName) => {
  const path = Book.schema.path(fieldName);
  if (!path || !path.enumValues) {
    throw new Error(`Enum not defined for field: ${fieldName}`);
  }
  return path.enumValues;
};

const getCategories = async () => {
  return getEnumValues("category");
};

const getFaculties = async () => {
  return getEnumValues("faculty");
};

const getClasses = async () => {
  return getEnumValues("class");
};

const getBookStatisticsData = async () => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalAvailableBooksAgg = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalAvailable: { $sum: "$availableCopies" },
        },
      },
    ]);

    const totalAvailableBooks = totalAvailableBooksAgg[0]?.totalAvailable || 0;

    const categoriesList = await getCategories();
    const totalCategories = categoriesList.length;

    const totalBorrowedBooksAgg = await Book.aggregate([
      {
        $project: {
          borrowed: { $subtract: ["$totalCopies", "$availableCopies"] },
        },
      },
      {
        $group: {
          _id: null,
          totalBorrowed: { $sum: "$borrowed" },
        },
      },
    ]);

    const totalBorrowed = totalBorrowedBooksAgg[0]?.totalBorrowed || 0;

    return { totalBooks, totalAvailableBooks, totalCategories, totalBorrowed };
  } catch (e) {
    throw new Error(e.message);
  }
};

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  getCategories,
  getFaculties,
  getClasses,
  getBookStatisticsData,
};
