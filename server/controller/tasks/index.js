import express from "express";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import {
  taskCreationValidationRules,
  errorMiddleware,
} from "../../middleware/validations/index.js";
import taskModel from "../../models/Tasks/index.js";
import sendEmail from "../../utils/sendEmail.js";

const router = express.Router();

/*
    API : Add Task
    Method : POST
    Desc : Add New Task into DB
    Access Type : Private
*/

router.post(
  "/",
  authMiddleware,
  taskCreationValidationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      // console.log(req.body);
      // const payload = req.payload

      const payload = req.payload;

      let { taskName, deadline } = req.body;

      let presentTime = new Date(); //utc format
      //   console.log(presentTime);

      let deadlineUtc = new Date(deadline); //from frontend

      let reminders = []; //pushed here

      if (presentTime > deadline) {
        return res.status(400).json({ error: "Deadline is In the past" });
      }
      //so that presentime is not greater than deadline provided

      let difference = deadlineUtc - presentTime;

      let mins = difference / (1000 * 60); //min conversion

      let days = difference / (1000 * 60 * 60 * 24); //day conversion

      if (mins > 5 || days > 30) {
        return res.status(400).json({
          error:
            "Invalid Data entered,Deadline Should be More than 5 mins or less than 30days",
        });
      }

      let reminders1 = new Date(+presentTime - difference / 4);
      let reminders2 = new Date(+presentTime - difference / 2);
      let reminders3 = new Date(+presentTime - difference / (4 / 3));

      reminders.push(reminders1, reminders2, reminders3, deadlineUtc);

      let taskData = {
        taskName,
        deadline,
        reminders,
      };

      let tasks = await taskModel.findOne({ user: payload._id });

      tasks.tasks.push(taskData);

      await tasks.save();

      res.status(200).json({ success: "New TAsk Created Successfully" });

      await sendEmail({
        to: user.email,
        subject: " Verify New User ",
        body: `Please click on this link to verify the user - http://localhost:5000/api/user/verify/email/${user.userVerifyToken.email}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
);

export default router;
