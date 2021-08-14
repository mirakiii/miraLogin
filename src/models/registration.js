const mongoose = require('mongoose')

const reg = new mongoose.Schema({
    first: {
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password1:{
        type:String,
        required:true,
        unique:true
    },
    password2:{
        type:String,
        required:true
    },
})
const Register = new mongoose.model('Register', reg)
module.exports = Register;

