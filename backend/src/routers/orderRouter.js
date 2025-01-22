const express = require('express');
const { createOrder,updateOrder,getAllOrders,deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('get-all', getAllOrders)
router.post('create', createOrder)
router.put('update/:id', updateOrder)
router.delete('delete/:id', deleteOrder)


module.exports = router;