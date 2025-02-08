import React from "react";
import { SigninBox } from "@/components";
import Image from "next/image";
export default function Signin() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[50%] h-full bg-[#3b0fa1] flex items-center justify-center">
                <Image src="/loginToZink.png" width={700} height={700} alt="image here"/>
            </div>
            <div className="w-[50%] h-full flex flex-col items-center justify-center text-[30px] text-white font-bold">
                <SigninBox />
            </div>
        </div>
    )
}