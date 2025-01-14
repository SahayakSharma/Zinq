'use client'
import { firebaseconfig } from "@/config/firebase";
import React from "react";

export default function SignupBox() {
    const [loading,setloading]=React.useState<true|false>(false)
    const [usercred, setusercred] = React.useState({
        email: "",
        password: ""
    })
    const handlesignin=async()=>{
        setloading(true)
        const fb=firebaseconfig.getInstance();
        const signin= fb.createuserwithemailpassword(usercred.email,usercred.password);
        console.log(signin)
    }
    
    return (
        loading?(
            <div className="w-full h-full flex items-center justify-center">Loading...</div>
        ):(
            <div className="w-[400px] h-[400px] bg-black rounded-md px-[50px] py-[30px]">
            <p className="text-[20px] text-white font-bold">Create a new account</p>
            <span>
                <p className="text-[13px] pt-[50px] px-[5px]">Email</p>
                <input className="w-full outline-none border-b-[1px] h-[40px] px-[5px] border-white bg-black" type="text" value={usercred.email} onChange={(e) => setusercred(() => ({ ...usercred, email: e.target.value }))} />
            </span>
            <span>
                <p className="text-[13px] pt-[50px] px-[5px]">Password</p>
                <input className="w-full outline-none border-b-[1px] px-[5px] h-[40px] border-white bg-black" type="password" value={usercred.password} onChange={(e) => setusercred(() => ({ ...usercred, password: e.target.value }))} />
            </span>
            <span className="w-full flex justify-center">
                <button className="w-[100px] px-[10px] py-[5px] mt-[50px] mx-auto border-[1px] border-white rounded-md font-bold hover:bg-gray-400 hover:text-black" onClick={handlesignin}>Sign In</button>
            </span>
        </div>
        )
    )
}