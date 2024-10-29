const { User } = require('../models');

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

module.exports = {
    getAllUsers,
    getUserById
};
