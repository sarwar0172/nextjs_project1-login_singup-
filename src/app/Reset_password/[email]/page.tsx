"use client"


import React from "react"
import {useSearchParams} from "next/navigation"
import axios from "axios"
import Link from "next/link"


export default function ResetPassword({ params }: { params: { email: string } }) {

    const [err,seterr]=React.useState()

    const searchparam=useSearchParams()

    const submit = (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        axios.post("/api/reset_password",{
            email:params.email,
            signature:searchparam.get("signature"),
            password:authState.password,
            password_confromation:authState.cPassword
        }).then((res)=>{
            const response=res.data
            seterr(response.message)
           
        }).catch((err)=>{
            setLoading(false)
            console.log("processing..")
        })
    }

    const [authState, setauthState] = React.useState({
        password: "",
        cPassword: ""
    })


    const [loading,setLoading]=React.useState(false)
    return (
        <>

            <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-[500px] p-5 rounded-lg shadow-lg">
                    <h1>Reset password</h1>
                    <h1>{err}</h1>

                    <form onSubmit={submit}>

                        <div className="mt-5">
                            <label className="block">password</label>
                            <input type="password" onChange={(event) => { setauthState({ ...authState, password: event.target.value }) }} placeholder="Enter your new password" className="w-full h-10 p2 border rouded-md outline-red-400" />
                        </div>

                        <div className="mt-5">
                            <label className="block">confrom password</label>
                            <input type="password" onChange={(event) => { setauthState({ ...authState, cPassword: event.target.value }) }} placeholder="Enter same  password" className="w-full h-10 p2 border rouded-md outline-red-400" />
                        </div>
                        <div className="mt-5">
                            <button className="w-full bg-black p-2 rounded-lg text-white" disabled={loading}>{loading ? "processing" : "submit"}</button>
                        </div>

                        <div className="mt-t text-center">
                            <Link href={'/login'} className="text-orange-400">Back to login page</Link>
                        </div>
                    </form>
               
                </div>

            </div>
        </>
    )



}