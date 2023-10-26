import {connect} from "@/dbconfig/dbconfig"
import {NextRequest,NextResponse} from "next/server"
import User from "@/app/models/userModel"
import Cryptr from "cryptr"
import Env from "@/config/env"
import bcript from "bcryptjs"

connect()

export async function POST(request:NextRequest){
    const reqbody=await request.json()
    const {email,signature,password,password_confromation}=reqbody


    // Check both password are same or not
    if(password!=password_confromation){
        return NextResponse.json({
            status:401,
            error:"password does not match"
        })
    }

    const crypter=new Cryptr(Env.EMAIL_INCREPTION_KEY)
    const decripted_email=crypter.decrypt(email)

    const user=await User.findOne({email:decripted_email,password_reset_token:signature})

    if(user==null || user==undefined){
        return NextResponse.json({
            status:400,
            message:"Reset url is not correct.plse double click it"
        })
    }

const salt=bcript.genSaltSync(10)
user.password=bcript.hashSync(password,salt)
user.password_reset_token=null
await user.save()

return NextResponse.json({
    status:200,
    message:"password changed successfully.please login with new password"
    
})
    
}
