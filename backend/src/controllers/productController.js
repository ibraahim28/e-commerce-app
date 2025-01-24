const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log(product);
        res.status(201).send({ success: true, data: product });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send({ success: true, data: products });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ success: false, error: 'Product not found' });
        }
        res.status(200).send({ success: true, data: product });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!product) {
            return res.status(404).send({ success: false, error: 'Product not found' });
        }
        res.status(200).send({ success: true, data: product });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ success: false, error: 'Product not found' });
        }
        res.status(200).send({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};