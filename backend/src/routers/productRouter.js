const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create',authenticateUser, createProduct);
router.get('/fetch', getAllProducts);
router.get('/fetch/:id',authenticateUser, getProductById);
router.put('/update/:id',authenticateUser, updateProduct);
router.delete('/delete/:id',authenticateUser, deleteProduct);

module.exports = router;