const express = require("express")
const Router = express.Router()
const UserRoutes = require("./V1/Userroutes")

//middleware
Router.use(express.json())

//V1
Router.use("/v1/user",UserRoutes)


module.exports = Router