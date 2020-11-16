import express from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
const router = express.Router()
import Product from '../models/productModel.js'

// We use express-async-handler in order to prevent using try catch in every single route.

// ===================================
// - @desc  Fetch all products.
// - @route  GET /api/products
// - @access  Public
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({})

        res.json(products)
    })
)

// ===================================
// - @desc  Fetch a single product.
// - @route  GET /api/products/:id
// - @access  Public

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
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
)

export default router
