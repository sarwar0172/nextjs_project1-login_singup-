import { connect } from "@/dbconfig/dbconfig";

import User from "@/app/models/userModel"

import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"


connect()

export async function POST(request:NextRequest){

try{
    const reqBody=await request.json()
    const {first_name,last_name,birthday,email,password,phone}=reqBody
    console.log(reqBody)
    // check if the user already exist======
    const user=await User.findOne({email})

    if(user){
        return NextResponse.json({error:"User already exist"},{status:400})
    }

//  hash password
const salt=await bcryptjs.genSalt(10)
const hashedPassword=await bcryptjs.hash(password,salt)

const newUser=new User({
    first_name,
    last_name,
    birthday,
    email,
    password:hashedPassword,
    phone
})

const savedUser=await newUser.save()
console.log(savedUser)

return NextResponse.json({
    message:"User created successfully",
    success:true,
    savedUser
})
       
}catch(error:any){
    return NextResponse.json({message:error,success:false})
}

  
}