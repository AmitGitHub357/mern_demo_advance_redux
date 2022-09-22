const nodemailer = require("nodemailer");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amit.metromindz@gmail.com",
    pass: "dnlxitkfrsceofri",
  },
});

let mailDetails = {
  from: "amit.metromindz@gmail.com",
  to: "amit979786@gmail.com",
  subject: "Test mail",
  text: "Node.js testing mail for test",
};
mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent successfully");
  }
});
