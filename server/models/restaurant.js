const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correctly import sequelize

const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
    },
    image_url: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

module.exports = Restaurant;
