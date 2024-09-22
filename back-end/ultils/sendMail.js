const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      user: 'minhtrung010321@gmail.com',
      pass: 'ftzvnhhcezoktjou'
   }
});

module.exports = { transporter };
