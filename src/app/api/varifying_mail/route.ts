
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import Cryptr from "cryptr"
import Env from "@/config/env";
import User from "@/app/models/userModel";
connect()

export async function POST(request:NextRequest){
    
    try{
        const reqbody=await request.json()
        
       const {email,token}=reqbody
       
       const crypter=new Cryptr(Env.EMAIL_INCREPTION_KEY)

       const decriptedEmail=crypter.decrypt(email)
       console.log(decriptedEmail)

       const user=await User.findOne({email:decriptedEmail})

       if(user.vaerifyToken!=token){

         return NextResponse.json({
            status:400,
            message:"varification link is not correct"
         })
       }

       user.isAdmin=true

       await user.save()

       return NextResponse.json({
         status:200,
         message:"Email varified successfully"
       })

    }catch(err){
        return NextResponse.json({
            status:500,
            message:"email validation api is not working"
        })
    }
    

}