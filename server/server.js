const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/userRoutes'); 
const categoryRouter = require('./routes/categoryRoutes');
const bookRouter = require('./routes/bookRoutes')
const borrowRouter = require('./routes/borrowSlipRoute')
const configRouter = require('./routes/configRoutes')
const statisticsRouter = require('./routes/statisticsRoutes'); // Import statistics routes
const configService = require('./services/configService');
require('dotenv').config(); 

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await configService.initConfig()
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Routes
app.use('/api', usersRouter);
app.use('/api', categoryRouter);
app.use('/api', bookRouter);
app.use('/api/borrowSlips', borrowRouter)
app.use('/api/configs', configRouter)
app.use('/api/statistics', statisticsRouter); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
