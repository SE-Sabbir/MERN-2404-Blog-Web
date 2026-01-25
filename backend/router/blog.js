const express = require('express')
const { createBlog } = require('../controllers/blogController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/upload', authMiddleware,createBlog)

module.exports = router