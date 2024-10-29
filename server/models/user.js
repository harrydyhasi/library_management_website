const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }, 
    full_name: { type: String, required: true }, 
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'manager', 'admin'],
        default: 'student'
    },
    personal_info: {
        full_name: { type: String },
        address: { type: String },
        phone: { type: String }
    },
    borrow_history: [
        {
            book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            borrowed_at: { type: Date, default: Date.now },
            returned_at: { type: Date }
        }
    ],
    is_active: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
