'use client'
import React from "react";
import { firebaseconfig } from "@/config/firebase";
export default function Home(){
    const handlelogouta= ()=>{
        const fb=firebaseconfig.getInstance();
        fb.signout();
    }
    return(
        <div>
            <button onClick={handlelogouta}> Logout </button>
        </div>
    )
}