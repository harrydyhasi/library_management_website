const Books = require("../models/books");
const Category = require("../models/category");
const generateBookId = require("../middlewares/bookMiddleware");
const Book = require("../models/books");
const fs = require("fs");

const path = require("path");
const csv = require("fast-csv");


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
      const filePath = req.file.path;
  
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Extract and format data from each row
          const {
            category_id,
            name,
            quantity,
            position,
            author,
            publisher,
            description,
          } = row;
  
          // Push the book object into the books array
          books.push({
            category_id,
            name,
            quantity,
            position,
            author,
            publisher,
            description,
          });
        })
        .on("end", async () => {
          try {
            // Validate and insert books into the database
            const insertedBooks = [];
            for (const bookData of books) {
              const category = await Category.findOne({ id: bookData.category_id });
              if (!category) {
                console.error(`Category not found for ID: ${bookData.category_id}`);
                continue; // Skip this book if category is invalid
              }
  
              const newBook = new Books({
                category_id: category._id,
                name: bookData.name,
                quantity: bookData.quantity,
                position: bookData.position,
                author: bookData.author,
                publisher: bookData.publisher,
                description: bookData.description,
              });
  
              const savedBook = await newBook.save();
              insertedBooks.push(savedBook);
            }
  
            // Return success response
            return res.status(200).json({
              message: "Books imported successfully",
              data: insertedBooks,
            });
          } catch (error) {
            console.error("Error saving books:", error);
            return res.status(500).json({
              message: "Error importing books",
              error: error.message,
            });
          }
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          return res.status(500).json({
            message: "Error reading CSV file",
            error: error.message,
          });
        });
    } catch (error) {
      console.error("Error importing books:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

  
module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateQuantityBook,
  importBooks
};
