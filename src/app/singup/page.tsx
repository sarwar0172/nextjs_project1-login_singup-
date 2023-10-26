"use client"

import React,{useEffect} from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'


import "./singup.css"
import { Fascinate } from "next/font/google"
export default function singupPage(){

const router=useRouter()
const [user,setUser]=React.useState({
  first_name:"",
  last_name:"",
  birthday:"",
  email:"",
  password:"",
  phone:"",
  emailvalidation:"false"

})

const [buttonDisable,SetbuttonDisable]=React.useState(false)
const[sendMail,setSendMail]=React.useState("")
useEffect(()=>{
  if(
    user.first_name.length>0 &&
    user.last_name.length>0&&
    user.birthday.length>0&&
    user.email.length>0&&
    user.password.length>0&&
    user.phone.length>0
  ){
     SetbuttonDisable(false)
  }else{
    SetbuttonDisable(true)
  }

},[user])


const [loding,setLoding]=React.useState(false)
const onsingup=async()=>{
    try{
        setLoding(true)
        

        const response=await axios.post("/api/singup",user)
        console.log("singup successed",response.data)

        const validation=await axios.post('/api/mail_sending_validation',{
          email:user.email
        })
        console.log(validation.data)

        setLoding(false)
        setSendMail('Check your inbox for Email validation')

    }catch(err:any){
      console.log("singup faild",err.massage)
    }
}



 return(
    <>
      <div className="main_div">
        <h1>{sendMail}</h1>
      <h1 className="text-center text-2xl">Registration from</h1>
      <h1 className="text-center text-1xl">{loding?"processing":"singup"}</h1>
       <div className="input_feilds">
       <p> First name</p>
       <input type="text" placeholder="inter your first name" value={user.first_name}  onChange={(e)=>setUser({...user,first_name:e.target.value})}/>
        
      <p>Last name</p>
      <input type="text" placeholder="inter your last name"  value={user.last_name} onChange={(e)=>setUser({...user,last_name:e.target.value})}/>
      
      <p>Birthday</p>
      <input type="date" placeholder="inter your date of birth" value={user.birthday} onChange={(e)=>setUser({...user,birthday:e.target.value})}/>

    <p>Email</p>
    <input type="email" placeholder="inter your email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />

    <p>Password</p>
    <input type="password" placeholder="inter your password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>

    <p>phone Number</p>
    <input type="number" placeholder="inter your phone number" value={user.phone} onChange={(e)=>setUser({...user,phone:e.target.value})}/>

       </div>
       <div className="singup_button">
       <button onClick={onsingup}>{buttonDisable?"No singup":"singup"}</button> <br /><br />
       <a href="/login" className="underline">visit login page</a>
       </div>
       
      </div>
      

    
    </>
 )
    
}