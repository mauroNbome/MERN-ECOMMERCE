import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

// We use express-async-handler in order to prevent using try catch in every single route.

// ===================================
// - @desc  Fetch all products.
// - @route  GET /api/products
// - @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// ===================================
// - @desc  Fetch a single product.
// - @route  GET /api/products/:id
// - @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        // Checking if mongo ID is valid.

        const product = await Product.findById(id)

        if (!product) {
            res.status(404).json({
                ok: false,
                message: 'Product not found'
            })
        } else {
            res.json(product)
        }
    } else {
        res.status(400).json({
            ok: false,
            message:
                'Invalid MongoDB ObjectId. Cannot find matching products with an invalid ObjectId.'
        })
    }
})

export { getProducts, getProductById }
