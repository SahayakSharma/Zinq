'use client';
import React from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { MdCallEnd } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function OnHold({ email }: { email: string }) {
    const router=useRouter();
    function handlehangup(){
        router.replace("/home");
    }
    return (
        <div className="w-full h-screen flex items-center justify-center text-white">
            <div className="w-[900px] h-[700px] bg-[#4d1fb8] rounded-xl shadow-md shadow-black p-[50px]">
                <BsPersonWorkspace className="w-[200px] h-[200px] mx-auto" />
                <p className="text-[30px] font-bold text-center pt-[20px]">{email}</p>
                <TbPhoneCall className="w-[50px] h-[50px] mx-auto mt-[100px] animate-ping" />
                <div className="w-[700px] flex justify-around items-center mt-[100px] mx-auto">
                    <FaVideo className="w-[40px] h-[40px] cursor-pointer" title="Video"/>
                    <MdCall className="w-[40px] h-[40px] cursor-pointer" title="Audio" />
                    <RiMessage2Fill className="w-[40px] h-[40px] cursor-pointer" title="Message" />
                    <div className="w-[60px] h-[60px] flex items-center justify-center bg-red-600 rounded-full">
                        <MdCallEnd className="w-[40px] h-[40px] cursor-pointer" color="white" title="Hang Up" onClick={handlehangup}/>
                    </div>
                </div>
            </div>
        </div>
    )
}