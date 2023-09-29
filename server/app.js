import express from "express"
import "./dbConnect.js"

const app =express()

const port =5000


app.use(express.json())     //Body parser


app.get("/",(req,res)=>{
    res.status(200).json({success :"Hello There"})
})

app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})