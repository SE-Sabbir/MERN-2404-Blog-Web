const mongoose = require('mongoose')
const userSchema = require('./userSchema')
const blogSchema = new mongoose.Schema({
    title:{type:String , required:true},
    content:{type:String, required:true},
    tags:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId , ref:"user",required:true},
    status:{type:String , enum:['active','inactive'] , default:'active'}
},{timestamps:true})

module.exports = mongoose.model("post", blogSchema)