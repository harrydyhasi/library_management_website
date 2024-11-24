const Books = require("../models/books");
const Category = require("../models/category");
const generateBookId = require("../middlewares/bookMiddleware");
const Book = require("../models/books");
const fs = require('fs');
const iconv = require('iconv-lite');
const { parse } = require('fast-csv');

const addBook = async (req, res) => {
  const {
    category_id,
    name,
    quantity,
    position,
    author,
    publisher,
    description,
  } = req.body;
  const image = req.files.image
    ? `/images/${req.files.image[0].filename}`
    : null;
  const pdf = req.files.pdf ? `/pdfs/${req.files.pdf[0].filename}` : null;

  if (
    !category_id ||
    !name ||
    !quantity ||
    !position ||
    !author ||
    !publisher
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const category = await Category.findOne({ id: category_id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newBook = new Books({
      category_id: category._id,
      name,
      quantity,
      position,
      author,
      publisher,
      description,
      image,
      pdf,
    });

    await newBook.save();
    return res
      .status(200)
      .json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateBook = async (req, res) => {
  const {
    category_id,
    name,
    quantity,
    position,
    author,
    publisher,
    description,
  } = req.body;
  const bookId = req.params.id;

  if (
    !category_id ||
    !name ||
    !quantity ||
    !position ||
    !author ||
    !publisher
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const category = await Category.findOne({ id: category_id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const book = await Books.findOne({ id: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.category_id = category._id;
    book.name = name;
    book.quantity = quantity;
    book.position = position;
    book.author = author;
    book.publisher = publisher;
    book.description = description;

    if (req.files && req.files.image) {
      book.image = `/images/${req.files.image[0].filename}`;
    }

    // Cập nhật PDF nếu có
    if (req.files && req.files.pdf) {
      book.pdf = `/pdfs/${req.files.pdf[0].filename}`;
    }

    if (book.category_id.toString() !== category._id.toString()) {
      await generateBookId.call(book);
    }

    await book.save();
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateQuantityBook = async (req, res) => {
  const { quantity } = req.body;
  const bookId = req.params.id;

  const book = await Books.findOne({ id: bookId });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!quantity) {
    return res.status(400).json({ message: "Quantity field are required" });
  }

  try {
    book.quantity = quantity;
    await book.save();
    return res
      .status(200)
      .json({ message: "Book updated successfully", data: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findOne({ id: id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Books.deleteOne({ id: id });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().populate("category_id");

    return res
      .status(200)
      .json({ message: "Books retrieved successfully", data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findOne({ id }).populate("category_id", "name");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book found", data: book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const importBooks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const books = [];
    let encoding = 'latin1'; // Đặt mặc định là latin1

    // Đọc file CSV và xử lý mã hóa
    fs.createReadStream(req.file.path)
      .pipe(iconv.decodeStream(encoding))
      .on('error', (err) => {
        console.error(`Error decoding with ${encoding}, trying utf-8:`, err);
        encoding = 'utf-8';
        fs.createReadStream(req.file.path)
          .pipe(iconv.decodeStream(encoding)) // Thử lại với UTF-8 nếu latin1 không thành công
          .pipe(parse({ headers: true }))
          .on("data", (row) => books.push(row)) // Đọc từng dòng và lưu vào mảng books
          .on("end", async () => { processBooks(req, books, res) });
      })
      .pipe(parse({ headers: true })) // Nếu mã hóa thành công ngay lập tức
      .on("data", (row) => books.push(row)) // Đọc từng dòng và lưu vào mảng books
      .on("end", async () => { processBooks(req, books, res) });
  } catch (error) {
    console.error("Error importing books:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const processBooks = async (req, books, res) => {
  try {
    const insertedBooks = [];
    for (const book of books) {
      const category = await Category.findOne({ id: book.category_id });
      if (!category) {
        console.error(`Category not found for ID: ${book.category_id}`);
        continue;
      }

      // Tạo sách mới nếu tìm thấy danh mục
      const newBook = new Books({
        category_id: category._id,
        name: book.name,
        quantity: parseInt(book.quantity),  // Chuyển đổi quantity thành số
        position: book.position,
        author: book.author,
        publisher: book.publisher,
        description: book.description,
      });

      // Lưu sách vào database
      const savedBook = await newBook.save();
      insertedBooks.push(savedBook);
    }

    // Xóa file CSV sau khi nhập xong
    fs.unlinkSync(req.file.path);

    // Trả về kết quả
    res.status(200).json({
      message: "Books imported successfully",
      data: insertedBooks,
    });
  } catch (error) {
    console.error("Error saving books:", error);
    res.status(500).json({ message: "Error saving books", error: error.message });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateQuantityBook,
  importBooks,
};
