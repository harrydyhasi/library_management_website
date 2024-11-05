const Config = require('../models/config');  

const configService = {
    initConfig: async () => {
        try {
            const configExists = await Config.findOne();
            if (!configExists) {
              const defaultConfig = new Config({
                maxBorrowDays: 14,
                maxBorrowBooks: 5,
                dailyFine: 0.5,
              });
              await defaultConfig.save();
              console.log('Default configuration created:', defaultConfig);
            } else {
              console.log('Configuration already exists:', configExists);
            }
          } catch (error) {
            console.error('Error initializing configuration:', error);
          }
    },
    get: async () => {
      try {
        return await Config.findOne();
      } catch (error) {
          throw new Error(`Error retrieving: ${error.message}`);
      }
    },
    updateConfig: async (newConfig) => {
      try {
          const config = await Config.findOne();
          if (!config) {
              throw new Error('Configuration not found');
          }

          // Update configuration fields
          config.maxBorrowDays = newConfig.maxBorrowDays || config.maxBorrowDays;
          config.maxBorrowBooks = newConfig.maxBorrowBooks || config.maxBorrowBooks;
          config.dailyFine = newConfig.dailyFine || config.dailyFine;

          const updatedConfig = await config.save();
          console.log('Configuration updated:', updatedConfig);
          return updatedConfig;
      } catch (error) {
          console.error('Error updating configuration:', error);
          throw error;
      }
  }
};
module.exports = configService;
