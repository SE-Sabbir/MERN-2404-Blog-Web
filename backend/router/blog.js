const express = require('express')
const { createBlog, getSlugBlog, deleteBlog, blogList } = require('../controllers/blogController')
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/upload', authMiddleware,createBlog)
router.delete('/delete' , authMiddleware ,deleteBlog)
router.get('/list', blogList)
router.get('/:slug' , getSlugBlog)

module.exports = router