'use client'
import React from "react";
import Image from "next/image";
import { firebaseconfig } from "@/config/firebase";
import { useRouter } from "next/navigation";
export default function Home(){
    const router=useRouter();
    const  handlelogout=()=>{
        const fb=firebaseconfig.getInstance();
        fb.signout();
    }
    return(
        <div className="w-full h-screen flex text-white">
            <div className="w-[50%] h-full flex flex-col justify-center items-center">
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md flex items-center justify-center text-[30px] font-bold cursor-pointer shadow-md shadow-black" title="Join A Room">Join A Room</div>
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md flex items-center justify-center text-[30px] font-bold mt-[20px] cursor-pointer shadow-md shadow-black" title="Create A New Room">Create A New Room</div>
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md flex items-center justify-center text-[30px] font-bold mt-[20px] cursor-pointer shadow-md shadow-black" title="Make A Call" onClick={()=>router.push("/connect")}>Make A Call</div>
                <button onClick={handlelogout} className="text-black">signout</button>
            </div>
            <div className="w-[50%] h-full bg-[#4d1fb8] opacity flex items-center justify-center">
                <Image src="/welcomeToZink.png" width={500} height={500} alt="image here"/>
            </div>
        </div>
    )
}