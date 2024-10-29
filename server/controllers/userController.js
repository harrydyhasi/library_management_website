// controllers/userController.js
const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user by ID
const getUserById = async (req, res) => { 
    const { id } = req.params; 

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




// Register a new user
const register = async (req, res) => {
    const { full_name, email, password, username } = req.body; 
    const saltRounds = 10;

    try {
        if (!full_name || !email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ username }); 
        if (existingUserByEmail || existingUserByUsername) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            full_name 
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                full_name: newUser.full_name,
                email: newUser.email,
                username: newUser.username 
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// User login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(401).json({ message: 'Email is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        const userResponse = {
            id: user._id, 
            full_name: user.name,
            email: user.email,
        };

        res.json({ message: 'Login successful', user: userResponse });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user information
const updateUser = async (req, res) => {
    const { id } = req.params;  
    const { full_name, email, password } = req.body;
    const saltRounds = 10;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.full_name = full_name ?? user.full_name;
        user.email = email ?? user.email;

        if (password) {
            user.password = await bcrypt.hash(password, saltRounds);
        }

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;  

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findByIdAndDelete(id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,  
    register,
    login,
    updateUser,
    deleteUser,
};
