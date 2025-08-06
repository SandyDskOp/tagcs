const express = require("express")
const Router = express.Router()
const {createUser,loginUser,getProfile,uploadPosts,getPosts} = require("../../Controllers/UserController")
const {verifyUserToken} = require("../../Middlewares/Authmiddleware")

Router.post("/",createUser)
Router.post("/login",loginUser)
Router.get("/profile",verifyUserToken,getProfile)
Router.post("/uploadPosts",uploadPosts)
Router.get("/getPosts",getPosts)

module.exports = Router