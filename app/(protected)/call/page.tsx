'use client'

import React,{useEffect,useState} from "react"
import { OnCall,OnHold } from "@/components";
import { useSocket } from "@/context/socketContext"
import { useSearchParams } from "next/navigation";
import { firebaseconfig } from "@/config/firebase";
export default function Page(){
    const fb=firebaseconfig.getInstance();
    const user=fb.getCurrentUser();
    const socket=useSocket();
    const [ringing,setringing]=useState(true);
    const temp=useSearchParams();
    const email=temp.get("email");

    useEffect(()=>{
        socket?.emit("CameOnline",{email:user?.email});
        socket?.emit("MakeCall",{receiverEmail:email,senderEmail:user?.email});
        socket?.on("CallAnswered",data=>{
            setringing(false);
        })
    },[])
    return(
        ringing ? 
        <OnHold email={email ? email : ""}/> : <OnCall email={email ? email : ""}/>
    )
}