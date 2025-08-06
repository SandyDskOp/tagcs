const Zod = require("zod")

const CREATE_USER_SCHEMA = Zod.object({
    username:Zod.string().min(5).max(20),
    email:Zod.string().email(),
    password:Zod.string().min(6).trim(),
    confirm_password :Zod.string().min(6).trim()
})

const LOGIN_USER = Zod.object({
    email:Zod.string().email(),
    password:Zod.string().min(6).trim()
})

const GET_POST_SCHEMA = Zod.object({
    page:Zod.string(),
    limit:Zod.string()
})


module.exports = {CREATE_USER_SCHEMA,LOGIN_USER,GET_POST_SCHEMA}