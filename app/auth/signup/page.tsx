import React from "react";
import { SignupBox } from "@/components";
import Image from "next/image";
export default function Signup() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[50%] h-full bg-[#3b0fa1] flex items-center justify-center">
                <Image src="/signupToZink.png" width={800} height={800} alt="image here"/>
            </div>
            <div className="w-[50%] h-full flex flex-col items-center justify-center text-[30px] text-white font-bold">
                <SignupBox />
            </div>
        </div>
    )
}