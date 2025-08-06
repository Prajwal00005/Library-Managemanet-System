import bookService from "../services/bookService.js";

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      bookNumber,
      publisher,
      category,
      faculty,
      class: classLevel,
      shelfNumber,
      totalCopies,
      purchaseDate,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }
    if (!bookNumber) {
      return res.status(400).json({ message: "Book number is required" });
    }
    if (!publisher) {
      return res.status(400).json({ message: "Publisher is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!faculty) {
      return res.status(400).json({ message: "Faculty is required" });
    }
    if (!classLevel) {
      return res.status(400).json({ message: "Class is required" });
    }
    if (!shelfNumber) {
      return res.status(400).json({ message: "Shelf number is required" });
    }
    if (!totalCopies) {
      return res.status(400).json({ message: "Total copies is required" });
    }

    const response = await bookService.createBook(
      {
        title,
        author,
        description,
        bookNumber,
        publisher,
        category,
        faculty,
        classLevel,
        shelfNumber,
        totalCopies,
        purchaseDate,
      },
      req.files
    );

    return res.status(201).json({
      message: "Book created successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const response = await bookService.getBooks(req.query);

    return res.status(200).json({
      message: "Books fetched successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await bookService.getBook(id);

    if (!response) {
      return res.status(404).json({ message: "Book unavailable" });
    }

    return res.status(200).json({
      message: "Book fetched successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await bookService.updateBook(id, req.body, req.files);

    if (!response) {
      return res.status(400).json({ message: "Failed to update" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await bookService.deleteBook(id);

    if (!response) {
      return res.status(400).json({ message: "Failed to delete" });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const data = await bookService.getCategories();

    return res.status(200).json({
      message: "Categories fetched successfully",
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getFaculties = async (req, res) => {
  try {
    const data = await bookService.getFaculties();

    return res.status(200).json({
      message: "Faculties fetched successfully",
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getClasses = async (req, res) => {
  try {
    const data = await bookService.getClasses();

    return res.status(200).json({
      message: "Classes fetched successfully",
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getBookStatisticsData = async (req, res) => {
  try {
    const { totalBooks, totalAvailableBooks, totalCategories, totalBorrowed } =
      await bookService.getBookStatisticsData();

    return res.status(200).json({
      message: "Classes fetched successfully",
      totalBooks,
      totalAvailableBooks,
      totalCategories,
      totalBorrowed,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
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
