const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
   userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
   },
   items : [
      {
         productId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
         },
         quantity : {
            type : Number,
            required : true,
            min : 1
         },
         price : {
            type : Number,
            required : true,
         },
         total : {
            type : Number,
            required : true
         },
         size : {
            type : String,
            enum : ['s','m','l','xl','xxl'],
            default : [],
         },
         color : {
            type : String,
            enum : ['red','blue','yellow','white'],
            default : []
         }
      }
   ],
   totalAmount : {
      type : Number,
      required : true
   },
   shippingAddress : {
      type : String,
      required : true
   },
   orderData :{
      type : Date,
      default : Date.now
   }
})


const order = mongoose.model('Order', orderSchema)

module.exports = order