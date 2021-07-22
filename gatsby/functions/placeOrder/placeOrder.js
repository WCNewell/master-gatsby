const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Test send an email
transporter.sendMail({
  from: "Slick's Slices <slick@example.com>",
  to: 'orders@example.com',
  subject: 'New Order',
  html: `<p>Your new pizza order is here!</p>`,
});
