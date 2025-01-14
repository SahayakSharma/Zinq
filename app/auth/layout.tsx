'use client'
import React, { useEffect, useState } from "react";
import {auth} from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function AuthLayout({children}:Readonly<{children:React.ReactNode}>){
    const router=useRouter();
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        onAuthStateChanged(auth,(data)=>{
            if(data){
                router.replace("/home");
            }
            else setloading(false)
        })
    },[onAuthStateChanged])
    return(
        loading?(
            <div>
                <p>Loading ...</p>
            </div>
        ):(
            <>
                {children}
            </>
        )
    )
}