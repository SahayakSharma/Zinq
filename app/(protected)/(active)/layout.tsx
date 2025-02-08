'use client'
import React, { ReactNode ,useState,useEffect} from "react";
import { useSocket } from "@/context/socketContext";
import { IoPerson } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { rtcConfig } from "@/config/webRTC/rtcConfig";
import { firebaseconfig } from "@/config/firebase";
export default function ActiveLayout({children,}:{children:ReactNode}){
    const instance=rtcConfig.getInstance();
    const fb=firebaseconfig.getInstance();
    const user=fb.getCurrentUser();
    const router=useRouter()
    const socket=useSocket()
    const [ringing,setringing]=useState(false);
    const [details,setdetails]=useState({
        email:"sahayaksharma",
        audio:true,
        video:false,
        offer:undefined
    })
    const handleanswer=async()=>{
        router.replace(`/receiveCall?email=${details.email}`)
    }
    const handledecline=()=>{
        setringing(false)
    }
    useEffect(()=>{
        socket?.on("CallReceived",async(data)=>{
            const senderEmail=data.senderEmail;
            const receiverEmail=data.receiverEmail;
            console.log("Call Received from ",senderEmail);
            setdetails({...details,email:senderEmail})
            setringing(true);
            console.log("Call Received")
        })
    },[])
    return(
        <div>
            {children}
            {
                ringing ? <div className="w-[400px] h-[400px] absolute text-white bottom-[20px] bg-[#4d1fb8] left-[1500px] shadow-xl shadow-black border-2 border-white rounded-xl p-[20px]">
                    <IoPerson className="w-[100px] h-[100px] mx-auto"/>
                    <p className="text-center text-[20px] pt-[20px]">{details.email}</p>
                    {
                        details.video ? <FaVideo className="w-[30px] h-[30px] mx-auto animate-ping mt-[50px]" color="white"/> : <FiPhoneCall className="w-[30px] h-[30px] mx-auto animate-ping mt-[50px]" color="white"/>
                    }
                    <div className="flex justify-around mt-[50px]">
                        <p className=" w-[40%] text-center font-bold rounded-xl px-[20px] py-[5px] bg-green-600 cursor-pointer border-[1px] border-white" onClick={handleanswer}>Answer</p>
                        <p className=" w-[40%] text-center font-bold rounded-xl px-[20px] py-[5px] bg-red-600 cursor-pointer border-[1px] border-white" onClick={handledecline}>Decline</p>
                    </div>
                </div> : null
            }
        </div>
    )
}