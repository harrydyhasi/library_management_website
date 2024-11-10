const Books = require('../models/books');
const BorrowSlip = require('../models/borrowSlip');
const User = require('../models/user');
const moment = require('moment');
const Category = require('../models/category');
const xlsx = require('xlsx');

const getTotalBooks = async (req, res) => {
    try {
        const totalBooks = await Books.countDocuments();
        res.json({ totalBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBooksPerCategory = async (req, res) => {
    try {
        const booksPerCategory = await Category.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: 'category_id',
                    as: 'books'
                }
            },
            {
                $project: {
                    name: 1,
                    count: { $size: '$books' }
                }
            }
        ]);
        res.json({ booksPerCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getMostBorrowedBooks = async (req, res) => {
    const oneMonthAgo = moment().subtract(1, 'month').toDate();
    try {
        const mostBorrowedBooks = await BorrowSlip.aggregate([
            { $match: { borrowed_date: { $gte: oneMonthAgo }, status: 'borrowed' } },
            {
                $unwind: '$books'
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books',
                    foreignField: 'id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $group: {
                    _id: '$book.name',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        res.json({ mostBorrowedBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTotalBorrowsInQuarter = async (req, res) => {
    const now = new Date();
    const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    try {
        const totalBorrows = await BorrowSlip.countDocuments({
            borrowed_date: { $gte: quarterStart },
            status: 'borrowed'
        });
        res.json({ totalBorrows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTotalReturns = async (req, res) => {
    try {
        const totalReturns = await BorrowSlip.countDocuments({ status: 'returned' });
        res.json({ totalReturns });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserCountByRole = async (req, res) => {
    try {
        const userCountByRole = await User.aggregate([
            {
                $group: {
                    _id: '$role', 
                    count: { $sum: 1 } 
                }
            }
        ]);
        res.json({ userCountByRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const exportBooksToExcel = async (req, res) => {
    try {
        const books = await Books.find({});
        const workbook = xlsx.utils.book_new();
        const booksSheetData = books.map(book => ({
            id: book.id,
            name: book.name,
            category_id: book.category_id,
            quantity: book.quantity,
            position: book.position,
            author: book.author,
            publisher: book.publisher,
            description: book.description,
            link: book.link
        }));
        const booksSheet = xlsx.utils.json_to_sheet(booksSheetData);
        xlsx.utils.book_append_sheet(workbook, booksSheet, 'Books');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        if (excelBuffer.length > 0) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=books.xlsx');
            res.send(excelBuffer);
        } else {
            res.status(500).json({ error: 'Failed to generate Excel file.  Empty buffer.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const exportCategoriesToExcel = async (req, res) => {
    try {
        const categories = await Category.find({});
        const workbook = xlsx.utils.book_new();
        const categoriesSheetData = categories.map(category => ({
            id: category.id,
            name: category.name
        }));
        const categoriesSheet = xlsx.utils.json_to_sheet(categoriesSheetData);
        xlsx.utils.book_append_sheet(workbook, categoriesSheet, 'Categories');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=categories.xlsx');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const exportBorrowSlipsToExcel = async (req, res) => {
    try {
        const borrowSlips = await BorrowSlip.find({});
        const workbook = xlsx.utils.book_new();
        const borrowSlipsSheetData = borrowSlips.map(borrowSlip => ({
            id: borrowSlip.id,
            user_id: borrowSlip.user_id,
            status: borrowSlip.status,
            borrowed_date: borrowSlip.borrowed_date,
            return_date: borrowSlip.return_date,
            manager_id: borrowSlip.manager_id
        }));
        const borrowSlipsSheet = xlsx.utils.json_to_sheet(borrowSlipsSheetData);
        xlsx.utils.book_append_sheet(workbook, borrowSlipsSheet, 'BorrowSlips');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=borrowSlips.xlsx');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const exportUsersToExcel = async (req, res) => {
    try {
        const users = await User.find({});
        const workbook = xlsx.utils.book_new();
        const usersSheetData = users.map(user => ({
            id: user.id,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: user.role,
            status: user.status,
            fullName: user.fullName
        }));
        const usersSheet = xlsx.utils.json_to_sheet(usersSheetData);
        xlsx.utils.book_append_sheet(workbook, usersSheet, 'Users');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTotalBooks,
    getBooksPerCategory,
    getMostBorrowedBooks,
    getTotalBorrowsInQuarter,
    getTotalReturns,
    getTotalUsers,
    getUserCountByRole,
    exportBooksToExcel,
    exportCategoriesToExcel,
    exportBorrowSlipsToExcel,
    exportUsersToExcel
};
