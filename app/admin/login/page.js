"use client"
import React from 'react'
import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
function admin_login() {
    const [visibilityword, setvisibilityword] = useState("visibility_off")
    const [adminname, setadminname] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const changevisibility = () => {
        setvisibilityword(prev =>
            prev === "visibility" ? "visibility_off" : "visibility"
        )
    };
    const handlelogin = async (e) => {
        e.preventDefault()
       const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminname, password })
})
        if (res.ok) {
            redirect("/admin/manage")
        } else {
            // const data = res.json()
            // seterror(data.error)
toast.error(res.message || "Login failed")
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen w-full'>
            <form className='w-full flex justify-center items-center gap-2 flex-col' onSubmit={handlelogin}>
                <h1 className='bg-black rounded-lg p-2 w-fit text-4xl'>Admin Login Page</h1>
                <div className='flex flex-col gap-1 w-[50%] mx-auto'>
                    <label htmlFor="adminname" className='text-2xl font-bold'>adminname:</label>
                    <input type="text" onChange={(e) => setadminname(e.target.value)} className='bg-white text-black w-full rounded-lg outline-2 outline-black focus:outline-white p-2' placeholder='Enter Admin Name' />
                </div>
                <div className='flex flex-col gap-1 w-[50%] mx-auto'>
                    <label htmlFor="password" className='text-2xl font-bold'>Password:</label>
                    <div className='flex gap-2 justify-center items-center'>
                        <input onChange={(e) => setpassword(e.target.value)} className='bg-white text-black w-[90%] p-2 rounded-lg outline-2 outline-black focus:outline-white' placeholder='Enter Password' type={visibilityword === "visibility" ? "text" : "password"} /><span onClick={changevisibility} className="material-symbols-outlined relative text-black active:scale-95 bg-white rounded-full p-1 h-fit w-fit cursor-pointer">
                            {visibilityword}

                        </span>
                    </div>
                    <button className='bg-black rounded-full px-2 py-1 w-fit self-center active:scale-95 cursor-pointer'>
                        Submit
                    </button>
                </div>
                {error && <di>{error}</di>}
            </form>
            <ToastContainer
            position='bottom-right'/>
        </div>
    )
}

export default admin_login