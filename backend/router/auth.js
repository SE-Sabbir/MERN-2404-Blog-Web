const express = require('express')
const { registerUser, verifyOTP, loginUser, forgatePassword, resetPassword, getUserProfile, updateProfile, refreshAccessToken } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer()
const router = express.Router()

router.post('/register' , registerUser )
router.post('/verify-otp' , verifyOTP )
router.post('/login' , loginUser)
router.post('/forgate-password', forgatePassword)
router.post('/reset-password/:token' , resetPassword)
router.get('/profile' ,authMiddleware ,getUserProfile)
router.put('/profile', authMiddleware, upload.single("avatar") , updateProfile)
router.post('/refresh-token', refreshAccessToken)

module.exports = router