import express from "express";
import Users from "../../models/Users/index.js";
import Tasks from "../../models/Tasks/index.js";
import {
  userRegistrationValidation,
  errorMiddleware,
} from "../../middleware/validations/index.js";
import bcrypt from "bcrypt";
import randomString from "../../utils/randomString.js";
import generateToken from "../../middleware/auth/generateToken.js";

const router = express.Router();

/*
    API: Register User
    Method : POST
    Desc : User signup
    Access Type : Public
*/

router.post(
  "/register",
  userRegistrationValidation(),
  errorMiddleware,
  async (req, res) => {
    try {
      const emailFound = await Users.findOne({ email: req.body.email });
      if (emailFound) {
        return res.status(409).json({ error: "User Already Registered" });
      }

      const phoneFound = await Users.findOne({ phone: req.body.phone });
      if (phoneFound) {
        return res.status(409).json({ error: "phone Already Registered" });
      }

      req.body.password = await bcrypt.hash(req.body.password, 12);

      const userObj = new Users(req.body);

      userObj.userVerifyToken.email = randomString(12);
      userObj.userVerifyToken.phone = randomString(12);

      const task = new Tasks();
      task.user = userObj._id; //reference
      userObj.tasks = task._id;

      await userObj.save();
      await task.save();

      res.status(200).json({ success: "User Succesfully added to DB" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
/*
    API: Login User
    Method : POST
    Desc : User Login
    Access Type : Public
*/

router.post("/login", async (req, res) => {
  try {
    const userFound = await Users.findOne({ email: req.body.email });

    if (!userFound) {
      return res.status(404).json({ error: "User mail has not been Found" });
    }

    const isValid = await bcrypt.compare(req.body.password, userFound.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials -Password is not matching" });
    }

    let payload = { email: userFound.email, _id: userFound._id };
    let token = generateToken(payload);

    if (userFound.userVerified.email == false) {
      return res.status(401).json({ error: "Email is not verified" });
    }

    res.status(200).json({ success: "User Login SuccessFully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/verify/email/:emailToken", async (req, res) => {
  try {
    let emailToken = req.params.emailToken;

    let userFound = await Users.findOne({
      "userVerifyToken.email": emailToken,
    }); //user finding

    if (userFound.userVerified.email == true) {
      return res.status(200).json({ message: "User is already verified" });
    }

    userFound.userVerified.email = true;
    await userFound.save();

    return res
      .status(200)
      .json({ success: "User email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
//token is for to verify that user is logged in or not and it is like authentication of user on application

export default router;
