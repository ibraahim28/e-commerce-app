const express = require('express');
const { createAdmin, loginAdmin } = require('../controllers/auth');
const upload = require('../middlewares/pictureUploaadMidleware');

const router = express.Router();

router.post('/create',upload.single('profilePicture'), createAdmin)
router.post('/login', loginAdmin)

module.exports = router;