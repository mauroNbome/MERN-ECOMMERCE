import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// To protect routes with middlewares you have to pass it as first argument, then the controller func.

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
