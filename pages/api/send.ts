import { NextApiRequest, NextApiResponse } from "next";


const send = async (req: NextApiRequest, res:NextApiResponse) => {
    console.log("API")
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: req.body.email,
    bcc:"soryu1111@gmail.com",
    subject: 'お問い合わせ',
    text: req.body.message,
  });
  res.status(200).json({
    success: true,
  });
};

export default send