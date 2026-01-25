const blogSchema = require("../models/blogSchema")
const responseHandler = require("../services/responseHandler")

// --------------------Create blog Controller-----------------------
const createBlog = async(req , res)=>{
    try{
        const {title, content , tags}= req.body
        const authorId = req.user._id
        if(!title){return responseHandler.error(res,"Title is required" , 400)}
        if(!content){ return responseHandler.error(res, "Content is required", 400)}
        if(!tags){ return responseHandler.error(res, "Tags is required", 400)}

        const newBlog = new blogSchema({
            title,
            content,
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

module.exports = {createBlog}