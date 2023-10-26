
"use client"
import React from "react"
import axios from "axios"
import {useSearchParams} from "next/navigation"
export default  function MailValidation({ params }: { params: { email: string } }){

   const[emailvalidation,SetEmailvalidation]=React.useState("")
   
   

   const searchparam=useSearchParams()
    
    const sendingInfo=()=>{
      
      axios.post('/api/varifying_mail',{
      email:params.email,
      token:searchparam.get('signature')
     }).then((res)=>{
      SetEmailvalidation(res.data.message)
     })
    
      
    }

    sendingInfo()
    
return(
   <>
   <h2>{emailvalidation}</h2>
  
   </>
)

}