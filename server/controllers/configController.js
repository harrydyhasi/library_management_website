const configService = require('../services/configService');

const configController = {
    updateConfig: async (req, res) => {
        try {
            const updatedConfig = await configService.updateConfig(req.body);
            return res.json({ success: true, data: updatedConfig });  
            
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });  
        }
    },
    get: async (req, res) => {
        try {
            const config = await configService.get();  
            return res.json({ success: true, data: config });  
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });  
        }
    },
};

module.exports = configController;
