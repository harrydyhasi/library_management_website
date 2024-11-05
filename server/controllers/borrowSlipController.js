const borrowSlipService = require('../services/borrowSlipService');  

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
        const {user_id, status,borrowed_date,return_date,manager_id, books} = req.body; 
        try {
            if (!user_id || !status || !manager_id) {
                return res.status(400).json({ success: false, message: 'user_id, status, and manager_id are required' });
            }
            const data = await borrowSlipService.create(user_id, status, borrowed_date, return_date, manager_id, books);
            return res.json({ success: true, data });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });  
        }
    },


    update: async (req, res) => {
        const { id } = req.params;  
        const updates = req.body;  
        try {
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
    }
}

module.exports = borrowSlipController;
