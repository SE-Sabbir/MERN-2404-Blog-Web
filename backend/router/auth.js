const express = require('express')
const { registerUser, verifyOTP, loginUser, forgatePassword } = require('../controllers/authController')
const router = express.Router()

router.post('/register' , registerUser )
router.post('/verify-otp' , verifyOTP )
router.post('/login' , loginUser)
router.post('/reset-password', forgatePassword)

module.exports = router