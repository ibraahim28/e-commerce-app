const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Beauty', 'Other']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    images: [
        {
            url: {
                type: String,
                required: false,
            },
            altText: {
                type: String,
                maxlength: 255
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
