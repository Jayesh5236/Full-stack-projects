import nodemailer from "nodemailer";
import config from "config";

async function sendEmail(emailBody) {
  try {
    const transporter = nodemailer.createTransport({
      host: config.get("EMAIL_SMTP.HOST"),
      port: 465,
      // secure: true,
      auth: {
        user: config.get("EMAIL_SMTP.AUTH.USER"),
        pass: config.get("EMAIL_SMTP.AUTH.PASSWORD"),
      },
    });

    const info = await transporter.sendMail({
      from: '"Team Haider" <kb0107@haider101.online>', // sender address
      to: emailBody.to, // list of receivers
      subject: emailBody.subject, // Subject line
      text: emailBody.body,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

export default sendEmail;

// sendEmail({
//   to: "jayesh5236@gmail.com",
//   subject: "Random Test",
//   body: "This is a random check of nodemailer",
// });
