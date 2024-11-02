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
        const user = await User.findOne({ id }).select('-password');
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
const createUser = async (req, res) => {
    const { email, password, fullName, role, phone } = req.body;
    const saltRounds = 10;

    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Email, password, and role are required' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const rolePrefix = role === 'student' ? 'SV' : role === 'manager' ? 'QL' : 'AD';

        // Find the latest user ID for the specific role
        const lastUser = await User.findOne({ id: new RegExp(`^${rolePrefix}`) }).sort({ id: -1 });
        const lastIdNumber = lastUser ? parseInt(lastUser.id.slice(2), 10) : 0; // Extract number from last ID
        const newIdNumber = lastIdNumber + 1; // Increment for new ID
        const formattedId = `${rolePrefix}${newIdNumber}`;

        const newUser = await User.create({
            id: formattedId,
            username: formattedId,
            email,
            password: hashedPassword,
            fullName,
            phone, // Store phone number
            role // Store role
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                fullName: newUser.fullName // Include full name in the response
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
            return res.status(401).json({ message: 'Invalid user email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const userResponse = {
            id: user.id, 
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            role: user.role,
            status: user.status
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
    const { email, password, phone, fullName, status, role } = req.body;
    const saltRounds = 10;

    try {
        const user = await User.findOne({ id: id }); // Assuming you're using _id as the identifier
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields only if new values are provided
        user.fullName = fullName?? user.fullName;  
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.status = status ?? user.status;
        user.role = role ?? user.role;

        // Update the password if provided
        if (password) {
            user.password = await bcrypt.hash(password, saltRounds);
        }

        // Save the updated user
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
        const user = await User.findOneAndDelete({id: id});
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
    createUser,
    login,
    updateUser,
    deleteUser,
};
