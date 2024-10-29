// models/index.js
const User = require('./user');
const Restaurant = require('./restaurant');
const FoodItem = require('./foodItem');

// Associations
Restaurant.hasMany(FoodItem);
FoodItem.belongsTo(Restaurant);

module.exports = {
    User,
    Restaurant,
    FoodItem
};
