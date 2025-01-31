const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : 3,
    },
    email : {
        type : String,
        required : [true, 'Email is required'], 
        unique : [true, 'Email is already registered to another account'],
    },
    password : {type : String ,required :true}
}, {timestamps:true})


const User = mongoose.model('Users', userSchema);

module.exports = User;