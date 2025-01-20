const mongoose = require('mongoose');

const adminModel = new mongoose.Schema({
    username : {type : String, required : true,},
    email : {type : String, required : true},
    password : {type : String, required : true},
})

const Admin = mongoose.model('admins', adminModel);

module.exports = Admin;