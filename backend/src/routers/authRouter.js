 const express = require('express');

 const {loginUser, createUser} = require('../controllers/auth');
 const router = express.Router();
 

 
 router.post("/login", loginUser);
 
 router.post("/register", createUser);

 module.exports = router