const express = require('express');
const { createOrder, updateOrder, getAllOrders, deleteOrder, getOneUsersOrders, getOrderById, getRecentOrders } = require('../controllers/orderController');

const router = express.Router();

router.get('/fetch', getAllOrders)
router.get('/fetch/:id', getOrderById)
router.get('/fetch/recent', getRecentOrders)
router.get('/fetch/user-orders', getOneUsersOrders)
router.post('/create', createOrder)
router.put('/update/:id', updateOrder)
router.delete('/delete/:id', deleteOrder)


module.exports = router;