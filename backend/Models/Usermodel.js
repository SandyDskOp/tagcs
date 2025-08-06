const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile_image:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    confirm_password:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return value === this.password
            },
            message:"Password mismatch"
        }
    }
})

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
    }

    this.confirm_password=null;
    next()
})

UserSchema.methods.comparepassword = async function(password){
    let comparison_result = await bcrypt.compare(password,this.password)
    return comparison_result
}

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel