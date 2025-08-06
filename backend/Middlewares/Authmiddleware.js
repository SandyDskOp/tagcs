const UserModel = require("../Models/Usermodel")
const CatchAsync = require("../Utilities/CatchAsync")
const JWT = require("jsonwebtoken")
const {APP_SECRET} = process.env

const verifyUserToken = CatchAsync(async(req,res,next)=>{
    let headers = req.headers
    let authorization = headers.authorization || false
    if(!authorization){
        return res.status(401).json({status:false,message:"No token found"})
    }

    let authToken = authorization.split(" ")[1]

    if(!authToken){
        return res.status(401).json({status:false,message:"No token found"})
    }

    const userData = await JWT.verify(authToken,APP_SECRET)
    if(!userData){
        return res.status(401).json({status:false,message:"Unauthorized access"})
    }

    req.id = userData.id
    next()
})

module.exports = {verifyUserToken}