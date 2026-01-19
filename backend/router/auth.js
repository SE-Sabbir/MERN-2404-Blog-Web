const express = require('express')
const { registerUser, verifyOTP, loginUser, forgatePassword, resetPassword, getUserProfile } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/register' , registerUser )
router.post('/verify-otp' , verifyOTP )
router.post('/login' , loginUser)
router.post('/forgate-password', forgatePassword)
router.post('/reset-password/:token' , resetPassword)
router.get('/profile' ,authMiddleware ,getUserProfile)

module.exports = router