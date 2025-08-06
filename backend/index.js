require("dotenv").config()

const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")

const Router = require("./Routes/MainRoutes")

const {DB_URL,API_PORT} = process.env
const port = API_PORT || 3000

app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))
app.use("/api",Router)
app.use((err,req,res,next)=>{
    console.log(err)
    return res.status(500).json({status:false,message:"Something went wrong",error:err.message})
})

mongoose.connect(DB_URL).then(()=>{
    app.listen(port,(err)=>{
        if(!err){
            console.log(`API running on ${port}`)
        }
    })
})
