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

router.post("/register", async (req, res) => {
  try {
    const { fname, email, password, age, address, phone } = req.body;

    // Check if the email or phone is already registered
    const emailFound = await Users.findOne({ email });
    const phoneFound = await Users.findOne({ phone });

    if (emailFound) {
      return res.status(409).json({ error: "Email Already Registered" });
    }

    if (phoneFound) {
      return res.status(409).json({ error: "Phone Number Already Registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification tokens
    const emailVerifyToken = randomString(12);
    const phoneVerifyToken = randomString(12);

    // Create a new user
    const user = new Users({
      fname,
      email,
      password: hashedPassword,
      age,
      address,
      phone,
      userVerifyToken: {
        email: emailVerifyToken,
        phone: phoneVerifyToken,
      },
    });

    // Create a task for the user
    const task = new Tasks();
    task.user = user._id;
    user.tasks = task._id;

    await user.save();
    await task.save();

    res.status(200).json({ success: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
      return res
        .status(404)
        .json({ error: "User mail has not been found/ does not exist" });
    }

    const isValid = await bcrypt.compare(req.body.password, userFound.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials - Password is Invalid" });
    }

    let payload = { email: userFound.email, _id: userFound._id };
    let token = generateToken(payload);

    if (userFound.userVerified.email == false) {
      return res.status(401).json({ error: "Email is not verified" });
    }

    res.status(200).json({ success: "User Login Successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get("/verify/email/:emailToken", async (req, res) => {
  try {
    const emailToken = req.params.emailToken;

    // Find the user by email token
    const userFound = await Users.findOne({
      "userVerifyToken.email": emailToken,
    });

    if (userFound.userVerified.email == true) {
      return res.status(200).json({ success: "User is already registered" });
    }

    // Mark the email as verified
    userFound.userVerified.email = true;

    await userFound.save();

    res.status(200).json({ success: "User is now verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;

/*
{
    "fname": "densi",
    "email": "densi@gmail.com",
    "password": "densi5620",
    "age":22,
    "address":"adajan",
    "phone":"123456789"

}
*/
