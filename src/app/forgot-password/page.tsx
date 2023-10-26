"use client"

import axios from "axios";
import React from "react";
import { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState<string>()
    const [sm, setsm] = useState("")

    const submit = (event: React.FormEvent) => {

        event.preventDefault()

        setLoading(true)
        axios.post('/api/forgot_password', { email: email })
            .then((res) => {
                const response = res.data;
                if (response.status == 200) {
                      setsm(response.message)

                } else if (response.status == 400) {
                    seterror(response.error)
                } else if (response.status == 500) {
                    seterror(response.message)
                }
            }).then(()=>{
                setLoading(false)
            })
            .catch((err) => {
                console.log("the error is", err)
            })
    }


    return (
        <>
            <div className="error flex justify-center mt-10">
                <h1>{error}</h1>
                <h1>{sm}</h1>
            </div>

            <div className="h-screen w-screen flex justify-center items-center">

                <div className="w-[500px] p-5 rounded-lg shadow-lg">
                    <h1>Forgot password?</h1>

                    <p>Don't worry it happens. just enter your email below and we will send an email to you. </p>

                    <form onSubmit={submit}>

                        <div className="mt-5">
                            <label htmlFor="email" className="block">Email</label>
                            <input type="email" onChange={(event) => { setEmail(event.target.value) }} placeholder="Enter your email" className="w-full h-10 p2 border rouded-md outline-red-400" />
                        </div>
                        <div className="mt-5">
                            <button className="w-full bg-black p-2 rounded-lg text-white" disabled={loading}> {loading ? "processing" : "submit"}</button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}