const UserModel= require("../Models/Usermodel")
const CatchAsync = require("../Utilities/CatchAsync")
const JWT = require("jsonwebtoken")
const {APP_SECRET} = process.env
const Zod = require("zod")
const {CREATE_USER_SCHEMA,LOGIN_USER,GET_POST_SCHEMA} = require("../Schemas/UserSchemas")
const axios = require("axios")
const PostModel = require("../Models/PostModel")

const createUser = CatchAsync(async(req,res)=>{
    const {success, data : userData} = CREATE_USER_SCHEMA.safeParse(req.body)
    if(!success){
        return res.status(400).json({status:"true",message:"Validation failed"})
    }
    const {username,email,password,confirm_password} = userData
    let existing_user = await UserModel.findOne({email:email})
    if(existing_user){
        return res.status(401).json({status:false,message:"Email already registered"})
    }

    let user = new UserModel({
        username,email,password,confirm_password
    })
    user = await user.save()
    if(!user){
        return res.status(400).json({status:false,message:"Error in fields"})
    }
    return res.status(200).json({status:true,message:"User created successfully"})
})

const loginUser = CatchAsync(async(req,res)=>{
    const {success, data : userData} = LOGIN_USER.safeParse(req.body)
    if(!success){
        return res.status(400).json({status:"true",message:"Validation failed"})
    }
    const {email,password} = userData

    let user = await UserModel.findOne({email:email}).select("+password")
    if(!user){
        return res.status(404).json({status:false,message:"No user found"})
    }

    let comparePassword = await user.comparepassword(password)
    if(!comparePassword){
        return res.status(400).json({status:false,message:"Password mismatch"})
    }

   const token = JWT.sign({id:user._id},APP_SECRET,{expiresIn:"1d"})

   return res.status(200).json({status:true,token:token})
})

const getProfile = CatchAsync(async(req,res)=>{
    const id = req.id;

    const user = await UserModel.findById(id)
    if(!user){
        return res.status(401).json({status:false,message:"Unauthorized access"})
    }

    return res.status(200).json({status:true,user})
})

const uploadPosts = CatchAsync(async(req,res)=>{
    let posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
    let uploadedposts = await PostModel.insertMany(posts.data)
    if(!uploadedposts){
        return res.status(400).json({status:false,message:"Cannot save posts"})
    }
    return res.status(200).json({status:true,message:"Posts saved"})
})

const getPosts = CatchAsync(async(req,res)=>{
    const {success,data:getPostData} = GET_POST_SCHEMA.safeParse(req.query) 
    if(!success){
        return res.status(400).json({status:false,message:"Validation failed"})
    }

    const {page,limit} = getPostData
    const totalDocuments = await PostModel.countDocuments()
    const posts = await PostModel.find().sort({id:-1}).skip((page-1)*limit).limit(limit)
    const totalPages = Math.ceil(totalDocuments/limit)

    return res.status(200).json({status:true,posts,totalPages})
})
module.exports = {createUser,loginUser,getProfile,uploadPosts,getPosts}