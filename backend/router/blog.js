const express = require('express')
const { createBlog, getSlugBlog, deleteBlog, blogList, blogListByUser } = require('../controllers/blogController')
const { authMiddleware } = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer()
const router = express.Router()

router.post('/upload', authMiddleware, upload.single("thumbnail"),createBlog)
router.delete('/:id' , authMiddleware ,deleteBlog)
router.get('/list', blogList)
router.get('/list-by-user' , authMiddleware , blogListByUser )
router.get('/:slug' , getSlugBlog)

module.exports = router