'use client'
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
export default function JoinRoom(){
    const router=useRouter();
    const roomID=useRef<HTMLInputElement>(null);
    const handleclick=()=>{
        router.replace(`/${roomID.current?.value}`)
    }
    return(
        <div className="w-[500px] h-[300px] bg-gray-400 rounded-ee-md p-[20px] text-white relative top-[300px] left-[200px] flex flex-col items-center justify-around">
            <input type="text" className="w-full h-[100px] placeholder:text-black text-black px-[20px] border-[1px] border-black flex items-center justify-center cursor-pointer bg-inherit text-[30px] font-bold rounded-md" placeholder="Room ID" ref={roomID}/>
            <button onClick={handleclick} className="w-full h-[50px] flex items-center justify-center bg-black px-[20px] py-[10px] text-[30px] font-bold rounded-md hover:bg-black hover:border-[1px] hover:border-white">
                Join Room
            </button>
        </div>
    )
}