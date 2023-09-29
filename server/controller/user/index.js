import express from "express"
import Users from "../../models/Users/index.js"
import Tasks from "../../models/Tasks/index.js"
import { userRegistrationValidation, errorMiddleware } from "../../middleware/validations/index.js"
import bcrypt from "bcrypt"
import randomString from "../../utils/randomString.js"

const router = express.Router()

/*
    API: Register User
    Method : POST
    Desc : User signup
    Access Type : Public
*/

router.post("/register", userRegistrationValidation(), errorMiddleware, async (req, res) => {
    try {
        const emailFound = await Users.findOne({ email: req.body.email })
        if (emailFound) {
            return res.status(409).json({ error: "User Email Already Exists / Registered" })
        }

        const phoneFound = await Users.findOne({ phone: req.body.phone })
        if (phoneFound) {
            return res.status(409).json({ error: "User phone Already Exists / Registered" })
        }

        req.body.password = await bcrypt.hash(req.body.password , 12)

        const user = new Users(req.body)

        user.userVerifyToken.email = randomString(12)
        user.userVerifyToken.phone = randomString(12)

        const task = new Tasks()
        task.user = user._id
        user.tasks = task._id

        await user.save()
        await task.save()

        res.status(200).json({success : "User Registered Successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

/*
    API: Login User
    Method : POST
    Desc : User Login
    Access Type : Public
*/

export default router