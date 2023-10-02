import express from "express";
import "./dbConnect.js";
import config from "config";
import taskRouter from "./controller/tasks/index.js"
import userRouter from "./controller/user/index.js"


const app = express();

const port = config.get("PORT");

app.use(express.json()); //Body parser

app.get("/", (req, res) => {
  res.status(200).json({ success: "Hello There" });
});

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});


/*
{
  "fname":"Jayesh",
  "email":"j@gmail.com",
  "password" :"jayesh5236",
  "age":24,
  "phone":9586330289
}
*/ 

//    "success": "User Login SuccessFully",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpAZ21haWwuY29tIiwiX2lkIjoiNjUxODI2MDBjNDEzMDIwNTQwZmRmODMyIiwiaWF0IjoxNjk2MjM3MzAxLCJleHAiOjE2OTY0OTY1MDF9.OsHafoLzkbS4zi1Medm-cOvjQi93UdfK2fj1M2rU-bg"
