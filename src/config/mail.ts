import nodemailer from "nodemailer"
import Env from "./env"
import { promises } from "dns";

export const transporter = nodemailer.createTransport({
    host: Env.SMPTP_HOST,
    port: Number(Env.SMPTP_PORT),
    secure: false,
    auth: {
      user: Env.SMPTP_USER,
      pass: Env.SMPTP_PASSWORD,
    },
  });

//*To send the email
export const sendEmail=async(to:string,subject:string,html:string)
:Promise<string | null>=>{
    const info=await transporter.sendMail({
        from:Env.SMPTP_FROM,
        to:to,
        subject:subject,
        html:html
    })
    return info?.messageId
}

