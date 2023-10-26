"use client"
import React,{useEffect} from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'
import "./login.css"
import { Fascinate } from "next/font/google"


//main function
export default function LoginPage(){


const router=useRouter()
const [user,setUser]=React.useState({
  email:"",
  password:"",
})



const [buttonDisable,SetbuttonDisable]=React.useState(false)
const [emailVarified,setEmailvarified]=React.useState('')

useEffect(()=>{
  if(
    user.email.length>0&&
    user.password.length>0
  ){
     SetbuttonDisable(false)
  }else{
    SetbuttonDisable(true)
  }
},[user])


const [loading,setLoding]=React.useState(false)


const onLogin= async()=>{
  try{
    setLoding(true)
    const response=await axios.post("/api/login",user)
    setEmailvarified(response.data.message) 
    router.push('/profile')
  }catch(error:any){
     console.log("login failed",error.massage)
  }
}

 return(
    <>
      <div className="main_div">
        <h2>{emailVarified}</h2>
      <h1 className="text-center text-2xl">Login from</h1>
       <div className="input_feilds">

    <p>Email</p>
    <input type="email" placeholder="inter your email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />

    <p>Password</p>
    <input type="password" placeholder="inter your password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>

       </div>
       <div className="login_button">
       <button onClick={onLogin}>{buttonDisable?"No login":"login"}</button> <br /><br />
       <a href="/singup" className="underline">visit singup page</a> <br /> <br />
       <a href="/forgot-password">Forget password</a>
       </div>
       
      </div>
      

    
    </>
 )
    
}