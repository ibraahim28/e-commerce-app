const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be longer than 3 and shorter than 12 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already registered to another account'],
    },
    password: { type: String, required: true },
    profilePicture: {
        type: String,
        default: './uploads/default.jpg',

    },
    userRole: { type: String, default: 'user' }
}, { timestamps: true })


const User = mongoose.model('Users', userSchema);

module.exports = User;