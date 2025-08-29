// helpers/email.helper.js
import nodemailer from "nodemailer";
import createTransporter from "../config/nodemailer.config.js";

export async function sendOTPEmail(to, otp) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: '"MyApp Auth" <no-reply@myapp.com>',
    to,
    subject: "🔐 Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<p>Your OTP code is <b>${otp}</b></p>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("📩 OTP Email sent: %s", info.messageId);
  console.log("📨 Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info;
}
