const blogSchema = require("../models/blogSchema")
const { uploadToCloudinary } = require("../services/cloudinaryConfig")
const responseHandler = require("../services/responseHandler")
const { generateBlogSlug } = require("../services/utils")

// --------------------Create blog Controller-----------------------
const createBlog = async(req , res)=>{
    try{
        const {title, content , tags }= req.body
        const authorId = req.user._id
        if(!title){return responseHandler.error(res,"Title is required" , 400)}
        if(!content){ return responseHandler.error(res, "Content is required", 400)}
        if(!tags){ return responseHandler.error(res, "Tags is required", 400)}
        if(!req.file){ return responseHandler.error(res , "Thumbnail image is required", 400)}
        const slug = generateBlogSlug(title);
        const existingBlog = await blogSchema.findOne({slug})
        if(existingBlog) { return responseHandler.error(res , "Blog with this Title already exists" , 400)}
        // ------upload to cloudinary
        const uploadResult = await uploadToCloudinary(req.file.buffer)
        const thumbnailUrl = uploadResult.secure_url;

        const newBlog = new blogSchema({
            thumbnail:thumbnailUrl,
            title,
            content,
            slug,
            tags,
            author:authorId
        })
        await newBlog.save();
        responseHandler.success(res, "Blog create Successfuly")
    }
    catch(err){
        responseHandler.error(res,"Internal Server Error")
        console.log(err)
    }
}
// --------------------get blog with slug Controller-----------------------
const getSlugBlog = async (req , res)=>{
    try {
        const slug = req.params.slug
        const blog = await blogSchema.findOne({slug}).populate("author" , "fullName email avatar")
        if(!blog){return responseHandler.error(res , "Blog not found", 400)}
        console.log("this is blog post" , blog)
        responseHandler.success(res , "Blog Post get successfully", blog)
    } catch (err) {
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}
// --------------------delete Blog Controller-----------------------
const deleteBlog = async(req , res) =>{
    try {
        const {id} = req.params
        console.log("blog id controller" , id)
        if(!id) {return responseHandler.error(res , "Blog Id is required" , 400)}
        const existingBlog = await blogSchema.findById(id).select("_id title")
        if(!existingBlog) { return responseHandler.error(res , "Blog not found" , 400)}
        await blogSchema.findByIdAndDelete(existingBlog._id)
        responseHandler.success(res , "Blog delete successfull")
    } catch (err) {
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}
// --------------------Blog List Controller-----------------------
const blogList = async(req , res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const totalCount = await blogSchema.countDocuments()
        const blogs = await blogSchema.find().populate("author", "fullName avatar").sort({createdAt: -1}).skip(skip).limit(limit)
        const simplifyRes = {
            data:blogs,
            pagination:{
                page,
                limit,
                totalItems:totalCount,
                totalPage: Math.ceil(totalCount / limit)
            }
        }
        responseHandler.success(res , "Blog List get Success" , simplifyRes)
    } catch (err) {
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}
// --------------------Blog List By User Controller-----------------------
const blogListByUser = async(req , res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const totalCount = await blogSchema.countDocuments()
        const blogs = await blogSchema.find({author: req.user._id}).populate("author", "fullName avatar").sort({createdAt: -1}).skip(skip).limit(limit)
        const simplifyRes = {
            data:blogs,
            pagination:{
                page,
                limit,
                totalItems:totalCount,
                totalPage: Math.ceil(totalCount / limit)
            }
        }
        responseHandler.success(res , "Blog List get Success" , simplifyRes)
    } catch (err) {
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}

module.exports = {createBlog , getSlugBlog , deleteBlog , blogList , blogListByUser}