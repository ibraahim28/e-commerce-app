const mongoose = require('mongoose');

const adminModel = new mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: {
        type: String,
        default: './uploads/default.jpg',
    },
    userRole: { type: String, default: 'admin' }
}, { timestamps: true });

const Admin = mongoose.model('admins', adminModel);

module.exports = Admin;