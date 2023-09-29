/*
fname,email,password,age,address,phone
userVerifyToken -Email ,Phone
userVerified - Email,pHone
role 
tasks

*/



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 13,
    max : 130
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    unique : true
  },
  userVerifyToken: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  userVerified: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },
  role: {
   type: String,
   default : "user"
  },
  tasks:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "TaskModel"
  }
});

export default mongoose.model("userModel" , userSchema , "users")