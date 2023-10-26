
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";

import Cryptr from "cryptr"
import Env from "@/config/env";
import cryptoRandomString from "crypto-random-string"
import {render} from "@react-email/render"
import EmailValidationmail from "@/emails/userValidationEmail"
import { sendEmail } from "@/config/mail"
import User from "@/app/models/userModel";


connect()

export async function POST(request:NextRequest){
     
     const reqbody=await request.json()
     
     const {email}=reqbody

     const crypter=new Cryptr(Env.EMAIL_INCREPTION_KEY)

     const increptedMail=crypter.encrypt(email)

     //*generate random string
     const randomStr=cryptoRandomString({
        length:64,
        type:"alphanumeric"
    })
     
    const user=await User.findOne({email})

    user.vaerifyToken=randomStr

    await user.save()

    const url=`${Env.APP_URL}/Email_validation/${increptedMail}?signature=${randomStr}`
    
    try{
        const html=render(EmailValidationmail({
            params:{
                url:url
            }
        }))

        // sending email 
        await sendEmail(email,'Mail_validation',html)
        return NextResponse.json({
            status:200,
            message:"Email sent successfully"
        })
    }catch(error){
           console.log("the error is ",error)
           return NextResponse.json({status:500,message:"something went wrong"})
    }


}