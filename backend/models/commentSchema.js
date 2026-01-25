const mongoose = require("mongoose")
const userSchema = require("./userSchema")
const commentSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId , ref:"user" , required:true},
    comment:{type:String , required:true},
    blog:{type:mongoose.Schema.Types.ObjectId , ref:"blog", required:true}
},{timestamps:true})

module.exports = mongoose.model("comment", commentSchema)