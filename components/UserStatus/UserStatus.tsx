'use client'
import React from "react";
import { useSocket } from "@/context/socketContext";
import { FiPhoneCall } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { firebaseconfig } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { IoPersonSharp } from "react-icons/io5";
export default function UserStatus({ email }: { email: string }) {
    const router=useRouter();
    const instance=firebaseconfig.getInstance();
    const user=instance.getCurrentUser();
    console.log(user)
    const [status, setstatus] = React.useState("offline");
    const socket = useSocket();
    function handleCall(){
        router.push(`/call?email=${email}&audio=${true}&video=${false}`)
    }
    function handleVideoCall(){
        router.push(`/call?email=${email}&audio=${true}&video=${true}`)
    }
    React.useEffect(() => {
        socket?.emit("GetUserStatus", { email: email })
        socket?.on("UserStatus", data => {
            const userstatus = data.status;
            setstatus(userstatus);
        })
    }, [])
    return (
        <div className="w-[60%] mx-auto h-screen p-[50px]" style={{boxShadow:"1px 1px 5px 1px #eeeeee"}}>
            <div className=" flex items-center w-full h-[150px]">
                <div className="w-[20px] h-[20px] rounded-full relative left-[101px] bottom-[42px] animate-ping " style={{ backgroundColor: status == "online" ? "green" : status == "oncall" ? "orange" : "red" }}></div>
                <div className="w-[15px] h-[15px] rounded-full relative left-[84px] bottom-[43px]" style={{ backgroundColor: status == "online" ? "green" : status == "oncall" ? "orange" : "red" }}></div>
                <div className="w-[100px] h-[100px] bg-[#eeeeee] rounded-full flex items-center justify-center overflow-hidden border-2 border-black">
                    <IoPersonSharp className="w-full h-full"/>
                </div>
                <div className="px-[50px]">
                    <p className="text-[50px] font-bold ">{email}</p>
                    <span className="flex text-[20px]">
                        <p className="font-bold">Status</p>
                        <p className="font-bold px-[20px]" style={{ color: status == "online" ? "green" : status == "oncall" ? "orange" : "red" }}>{status}</p>
                    </span>
                </div>
            </div>
            <div className="w-[50%] h-[100px] items-center flex justify-around ml-[150px]">
                <div className="w-[60px] h-[60px] rounded-md  flex items-center justify-center cursor-pointer">
                    <FiPhoneCall className="w-[40px] h-[40px]" title="Call" onClick={handleCall}/>
                </div>
                <div className="w-[60px] h-[60px] rounded-md  flex items-center justify-center cursor-pointer">
                    <FaVideo className="w-[40px] h-[40px]" title="Video Call" onClick={handleVideoCall}/>
                </div>
                <div className="w-[60px] h-[60px] rounded-md  flex items-center justify-center cursor-pointer">
                    <MdOutlineMessage className="w-[40px] h-[40px]" title="Message"/>
                </div>
                <div className="w-[60px] h-[60px] rounded-md  flex items-center justify-center cursor-pointer">
                    <MdBlock className="w-[40px] h-[40px]" title="Block"/>
                </div>
                
            </div>
        </div>
    )
}