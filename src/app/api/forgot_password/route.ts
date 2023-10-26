import {connect} from "@/dbconfig/dbconfig"
import {NextRequest,NextResponse} from "next/server"
import User from "@/app/models/userModel"
import cryptoRandomString from "crypto-random-string"
import Cryptr from "cryptr"
import Env from "@/config/env"
import {render} from "@react-email/render"
import ForgotPasswordEmail from "@/emails/forgotpasswrdEmail"
import { sendEmail } from "@/config/mail"

connect()

export async function POST(request:NextRequest){
    const {email}=await request.json()

    // check user email first
    const user=await User.findOne({email})

    if(!user){
        return NextResponse.json({
            status:400,
            error:"No user fonud with this email"
            
        })
    }


    //*generate random string
    const randomStr=cryptoRandomString({
        length:64,
        type:"alphanumeric"
    })

    user.password_reset_token=randomStr

    // saving to database
    await user.save()


    // Encrypt user email
    const crypt=new Cryptr(Env.EMAIL_INCREPTION_KEY)
    const EncryptedEmail=crypt.encrypt(user.email)

    
    const url=`${Env.APP_URL}/Reset_password/${EncryptedEmail} ?signature=${randomStr}`

    try{
        const html=render(ForgotPasswordEmail({
            params:{
                name:user.name,
                url:url
            }
        }))

        // sending email 
        await sendEmail(email,'Reset-password',html)
        return NextResponse.json({
            status:200,
            message:"Email sent successfully"
        })
    }catch(error){
           console.log("the error is ",error)
           return NextResponse.json({status:500,message:"something went wrong"})
    }
}