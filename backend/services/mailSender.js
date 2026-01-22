const nodemailer = require("nodemailer");

// _______nodemailer config________
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "sabbirhp450@gmail.com",
    pass: "mgzr itzd ernq twsz",
  },
});

// _______send mail_______
const sendMail =async (mailTo , mailSub , mailTemplate)=>{
    const info = await transporter.sendMail({
        from: '"MERN-Blog-Web" <sabbirhp450@gmail.com>',
        to: mailTo,
        subject: mailSub,
        html: mailTemplate,
      });
      console.log("Message sent:", info.messageId);
}

module.exports = sendMail