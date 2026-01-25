const express = require('express')
const { createBlog, getSlugBlog } = require('../controllers/blogController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/upload', authMiddleware,createBlog)
router.get('/:slug' , getSlugBlog)

module.exports = router