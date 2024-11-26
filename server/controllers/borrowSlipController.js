const borrowSlipService = require("../services/borrowSlipService");
const Books = require("../models/books");
const BorrowSlip = require("../models/borrowSlip");

const borrowSlipController = {
  getAllBorrowSlips: async (req, res) => {
    try {
      const borrowSlips = await borrowSlipService.getAll();
      return res.json({ success: true, data: borrowSlips });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const borrowSlip = await borrowSlipService.findById(id);
      return res.json({ success: true, data: borrowSlip });
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
  },

  create: async (req, res) => {
    const { user_id, status, borrowed_date, return_date, manager_id, books } =
      req.body;
    try {
      if (!user_id || !status) {
        return res.status(400).json({
          success: false,
          message: "Mã người dùng không được để trống!",
        });
      }
      if (!Array.isArray(books) || books.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Phiếu mượn chưa có sách",
        });
      }

      const existingBooks = await Books.find({ id: { $in: books } }).select(
        "id"
      );
      const existingBookIds = existingBooks.map((book) => book.id.toString());
      const missingBooks = books.filter(
        (bookId) => !existingBookIds.includes(bookId)
      );

      if (missingBooks.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Một số sách không tìm thấy",
          missingBooks,
        });
      }

      const existingBorrowSlips = await BorrowSlip.find({
        user_id: user_id,
        books: { $in: books },
        status: { $ne: "returned" },
      });

      if (existingBorrowSlips.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Người dùng đã mượn những quyển sách này trước đó.",
        });
      }
      const data = await borrowSlipService.create(
        user_id,
        status,
        borrowed_date,
        return_date,
        manager_id,
        books
      );
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      if (!updates.user_id || !updates.status) {
        return res.status(400).json({
          success: false,
          message: "Mã người dùng và tình trạng không được để trống!",
        });
      }

      if (!Array.isArray(updates.books) || updates.books.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Phiếu mượn chưa có sách",
        });
      }

      // Check if the books exist in the database by 'id' (instead of _id)
      const existingBooks = await Books.find({
        id: { $in: updates.books },
      }).select("id");
      const existingBookIds = existingBooks.map((book) => book.id.toString());
      const missingBooks = updates.books.filter(
        (bookId) => !existingBookIds.includes(bookId)
      );

      if (missingBooks.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Một số sách không tìm thấy",
          missingBooks,
        });
      }
      const updatedSlip = await borrowSlipService.update(id, updates);
      return res.json({ success: true, data: updatedSlip });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await borrowSlipService.delete(id);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getBorrowSlipsByUserId: async (req, res) => {
    const { userId } = req.params; // assuming userId is passed as a route parameter

    try {
      const borrowSlips = await borrowSlipService.getBorrowSlipsByUserId(
        userId
      );

      if (!borrowSlips || borrowSlips.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No borrow slips found for this user",
        });
      }
      return res.json({ success: true, data: borrowSlips });
      // res.status(200).json(borrowSlips);
    } catch (error) {
      console.error("Error in getBorrowSlipsByUserId:", error);
      res.status(500).json({
        success: false,
        message: "Server error occurred while fetching borrow slips",
      });
    }
  },
};

module.exports = borrowSlipController;
