const BorrowSlip = require('../models/borrowSlip');  
const Books = require('../models/books');

const borrowSlipService = {
    create: async (userId, status, borrowedDate, returnDate, managerId, books) => {
        try {
            const  borrowSlip = new BorrowSlip({
                user_id: userId,
                status: status,
                borrowed_date: borrowedDate,
                return_date: returnDate,
                manager_id: managerId,
                books: books
            });
            return await  borrowSlip.save();
        } catch (error) {
            throw new Error(`Error creating borrow slip: ${error.message}`);
        }
    },
    
    findById: async (id) => {
        try {
            const  borrowSlip = await BorrowSlip.findById(id)
                .populate('user_id', 'id fullName')  
                .populate('manager_id', 'id fullName');  
            if (! borrowSlip) throw new Error(' BorrowSlip not found');
            return  borrowSlip;
        } catch (error) {
            throw new Error(`Error finding book slip by ID: ${error.message}`);
        }
    },

     
    update: async (id, updates) => {
        try {
            const  borrowSlip = await BorrowSlip.findByIdAndUpdate(id, updates, { new: true });
            if (! borrowSlip) throw new Error(' BorrowSlip not found');
            borrowSlip.books.map(async (a) => {
                const book = await Books.findOne({ id: a});
                if (borrowSlip.status == "borrowed") {
                    book.quantity--
                }
                else if (borrowSlip.status == 'returned') {
                    book.quantity++
                }
                await book.save()
            })
            return  borrowSlip;
        } catch (error) {
            throw new Error(`Error updating borrow slip: ${error.message}`);
        }
    },

    delete: async (id) => {
        try {
            const  borrowSlip = await BorrowSlip.findByIdAndDelete(id);
            if (! borrowSlip) throw new Error(' BorrowSlip not found');
            return { success: true, message: ' BorrowSlip deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting borrow slip: ${error.message}`);
        }
    },

    getAll: async () => {
        try {
            return await BorrowSlip.find()
            // .populate('user_id', 'id fullName')   // Populate user_id with selected fields
            // .populate('manager_id', 'id fullName');
        } catch (error) {
            throw new Error(`Error retrieving all borrow slips: ${error.message}`);
        }
    },
     
    checkExistingSlip: async (userId, borrowedDate, returnDate) => {
        try {
            const existingSlip = await BorrowSlip.findOne({
                user_id: userId,
                $or: [
                    { borrowed_date: { $gte: borrowedDate, $lte: returnDate } },
                    { return_date: { $gte: borrowedDate, $lte: returnDate } }
                ]
            });
            return !!existingSlip;  
        } catch (error) {
            throw new Error(`Error checking existing borrow slip: ${error.message}`);
        }
    },
    getBorrowSlipsByUserId: async(userId) => {
        try {
            const borrowSlips = await BorrowSlip.find({ user_id: userId });
            return borrowSlips;
            } catch (error) {
            console.error("Error fetching borrow slips:", error);
            throw error;
        }
    }
};

module.exports = borrowSlipService;
