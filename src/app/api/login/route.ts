import { connect } from "@/dbconfig/dbconfig"
import User from "@/app/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {email,password}=reqBody

        const user=await User.findOne({email})
        console.log(user)
         
        if(!user){
            return NextResponse.json({message:"user does not exist"},{status:400})
        }

        
        console.log(user.isAdmin)
       
        if(user.isAdmin==false){
            return NextResponse.json({
                status:400,
                message:"User email is not varified. please verify your email"
            })
        }

        const validpassword=await bcryptjs.compare(password,user.password)
        
        if(!validpassword){
            return NextResponse.json({message:"invalid password"},{status:400})
        }
// if user is varified create a token
const tokenData={
    id:user._id,
    email:user.email
}

const token=await jwt.sign(tokenData,"firstNextProject",{expiresIn:"1d"})//firstNextProject it is a screat key

const response=NextResponse.json({
    message:"Login successful",
    success:true
})

response.cookies.set('token',token,{
    httpOnly:true
})

return response


    }catch(error:any){
       return NextResponse.json({
        message:"login api is not working"

       })
    }
}