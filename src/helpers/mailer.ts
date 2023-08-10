import User from "@/models/userModel";
import bcrypjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        const hasedToken = await bcrypjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {  
            await User.findByIdAndUpdate(userId, {verifyToken: hasedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hasedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "37ee115a277a73",
              pass: "b901bb30b21e64"
            }
          });

          const mailOption = {
            from: 'atulghormare6@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}</p>`
          }

          const mailresponse = await transport.sendMail(mailOption);
          return mailresponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}