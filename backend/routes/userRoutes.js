import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// To protect routes with middlewares you have to pass it as first argument, then the controller func.

router.route('/').post(registerUser)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router
