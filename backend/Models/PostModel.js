const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true})

const PostModel = mongoose.model("post",PostSchema)
module.exports = PostModel