import React from "react";


export default function GeneralLoader() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[50%] h-full flex justify-center flex-col items-center">
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md animate-pulse" title="Join A Room"></div>
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md animate-pulse mt-[20px]" title="Create A New Room"></div>
                <div className="w-[60%] h-[100px] bg-[#4d1fb8] rounded-md animate-pulse mt-[20px]" title="Make A Call"></div>
            </div>
            <div className="w-[50%] h-full bg-[#3b0fa1] flex items-center justify-center text-[50px] font-bold text-white">Loading...</div>
        </div>
    )
}