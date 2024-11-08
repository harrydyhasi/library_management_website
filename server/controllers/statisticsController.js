const Books = require('../models/books');
const BorrowSlip = require('../models/borrowSlip');
const User = require('../models/user');
const moment = require('moment');

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
        const booksPerCategory = await Books.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: '$category.name',
                    count: { $sum: 1 }
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
                    _id: '$role', // Group by the `role` field
                    count: { $sum: 1 } // Count each role
                }
            }
        ]);
        res.json({ userCountByRole });
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
    getUserCountByRole
};
