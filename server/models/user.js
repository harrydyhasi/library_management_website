const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {type: String, required: true },
    phone: { type: String },
    role: {
        type: String,
        enum: ['student', 'manager', 'admin'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['active', 'locked'],
        default: 'active'
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
