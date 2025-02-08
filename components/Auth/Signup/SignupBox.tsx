'use client'
import { firebaseconfig } from "@/config/firebase";
import React from "react";
import Link from "next/link";
export default function SignupBox() {
    const [loading, setloading] = React.useState<true | false>(false)
    const [usercred, setusercred] = React.useState({
        email: "",
        password: ""
    })
    const handlesignup = async () => {
        try {
            setloading(true)
            const fb = firebaseconfig.getInstance();
            const signin = await fb.createuserwithemailpassword(usercred.email, usercred.password)
            if (signin.status != "200") {
                setloading(false)
                setusercred({ ...usercred, email: "", password: "" })
                alert(signin.message)
            }
        }
        catch (err) {
            setloading(false);
            if (err instanceof Error) alert(err.message)
        }
    }

    return (
        loading ? (
            <div className="w-[500px] h-[450px] bg-[#3b0fa1] rounded-md px-[50px] py-[30px]">
                <div className="w-full h-[50px] animate-pulse bg-[#4d1fb8]"></div>
                <div className="w-[100px] h-[20px] animate-pulse bg-[#4d1fb8] mt-[30px]"></div>
                <div className="w-full h-[50px] animate-pulse bg-[#4d1fb8] mt-[10px]"></div>
                <div className="w-[100px] h-[20px] animate-pulse bg-[#4d1fb8] mt-[30px]"></div>
                <div className="w-full h-[50px] animate-pulse bg-[#4d1fb8] mt-[10px]"></div>
                <div className="w-[200px] h-[40px] animate-pulse bg-[#4d1fb8] mt-[30px] rounded-md mx-auto"></div>
                <div className="w-[60%] h-[10px] animate-pulse bg-[#4d1fb8] mt-[20px] mx-auto"></div>
            </div>
        ) : (
            <div className="w-[500px] h-[450px] bg-[#3b0fa1] rounded-md px-[50px] py-[30px] text-[18px] font-light">
                <p className="text-[30px] text-white font-bold ">Create a New Account</p>
                <span>
                    <p className="text-[15px] pt-[50px] font-light">Email</p>
                    <input className="w-full outline-none border-b-[1px] h-[40px] border-white bg-inherit" type="text" value={usercred.email} onChange={(e) => setusercred(() => ({ ...usercred, email: e.target.value }))} />
                </span>
                <span>
                    <p className="text-[15px] pt-[50px] font-light">Password</p>
                    <input className="w-full outline-none border-b-[1px] h-[40px] border-white bg-inherit" type="text" value={usercred.password} onChange={(e) => setusercred(() => ({ ...usercred, password: e.target.value }))} />
                </span>
                <div className="flex w-full justify-center mt-[40px]">
                    <button className="bg-inherit opacity-50 px-[10px] py-[3px] text-[20px] border-[1px] border-white rounded-md hover:opacity-100" onClick={handlesignup}>Create Account</button>
                </div>
                <div className="flex w-full justify-center mt-[10px]">
                    <Link href="/auth/signin" className="text-[12px] font-light underline">Already have an account ? Login!</Link> 
                </div>
            </div>
        )
    )
}