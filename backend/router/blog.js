const express = require('express')
const { createBlog, getSlugBlog, deleteBlog } = require('../controllers/blogController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/upload', authMiddleware,createBlog)
router.get('/:slug' , getSlugBlog)
router.delete('/delete' , authMiddleware ,deleteBlog)

module.exports = router