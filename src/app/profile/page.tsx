"use client"
import { useRouter } from "next/navigation"
import "./profile.css"
import axios from "axios"





export default function profilePage(){

    const router=useRouter()

const logout=async ()=>{
    try{
        await axios.get('/api/logout')
        router.push('/login')
    }catch{

    }
}

    return (
        <>
        <div className="main">
        <h1>this is the profile page</h1> <br />
        <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
        
        </>
    )
}