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
    max: 130,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  userVerifyToken: {      // token is to be stored here 
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  userVerified: {   //user verification
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,      //if verified it will be true
      default: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskModel",
  },
});

export default mongoose.model("userModel", userSchema, "users");
/*
1.import name 
2.function 
3.mongodb folder name 
*/ 
