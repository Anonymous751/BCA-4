// config/nodemailer.config.js
import nodemailer from "nodemailer";

let transporter = null;

export default async function createTransporter() {
  if (transporter) return transporter;

  // create test account (ethereal)
  const testAccount = await nodemailer.createTestAccount();

  console.log("🔑 Ethereal Credentials:");
  console.log("  Username:", testAccount.user);
  console.log("  Password:", testAccount.pass);

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter;
}
