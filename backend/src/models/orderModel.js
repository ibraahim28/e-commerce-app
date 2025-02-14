const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   items: [
      {
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
            min: 1,
         },
         price: {
            type: Number,
            required: true,
         },
         total: {
            type: Number,
            required: true,
         },
         size: {
            type: String,
            enum: ['s', 'm', 'l', 'xl', 'xxl'],
            default: null,  
         },
         color: {
            type: String,
            enum: ['red', 'blue', 'yellow', 'white'],
            default: null,  
         }
      }
   ],
   totalAmount: {
      type: Number,
      required: true,
   },
   shippingAddress: {
      type: String,
      required: true,
   },
   orderDate: {
      type: Date,
      default: Date.now,
   },
   status: {
      type: String,
      enum: ['pending', 'shipped', 'cancelled', 'delivered'],
      default: 'pending',  
   },
}, {timestamps : true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
