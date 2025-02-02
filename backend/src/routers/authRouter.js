const express = require('express');
const { loginUser, createUser } = require('../controllers/auth');
const upload = require('../middlewares/pictureUploaadMidleware');
const router = express.Router();



router.post("/login", loginUser);

router.post("/register", upload.single('profilePicture'), createUser);

module.exports = router