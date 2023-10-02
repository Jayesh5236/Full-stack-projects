import nodemailer from "nodemailer";
import config from "config";

//syntaxial thing
async function sendEmail(emailbody) {
  try {
    const transporter = nodemailer.createTransport({
      host: config.get("EMAIL_SMTP.HOST"),
      port: 465,
      // secure :true,
      auth: {
        user: config.get("EMAIL_SMTP.AUTH.USER"),
        pass: config.get("EMAIL_SMTP.AUTH.PASSWORD"),
      },
    });

    const info = await transporter.sendEmail({
      from: "Team Jayesh <kb0107@haider101.online>",
      to: emailbody.to, //list of recivers
      subject: emailbody.subject, //subject line
      text: emailbody.body,
    });

    console.log("Message sent : %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}
