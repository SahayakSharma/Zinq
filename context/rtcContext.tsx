
import React,{createContext,useContext,Dispatch,SetStateAction, useState, useEffect} from "react";

type rtcContextType={
    pc:RTCPeerConnection|null,
    setpc:Dispatch<SetStateAction<RTCPeerConnection |null>>,
    type:string|null,
    settype:Dispatch<SetStateAction<string |null>>
}
const rtcContext=createContext<rtcContextType|null>(null);


export const RtcProvider=({children}:{children:React.ReactNode})=>{
    const [pc,setpc]=useState<RTCPeerConnection|null>(null)
    const [type,settype]=useState<string|null>("sender")


    useEffect(()=>{
        const pc=new RTCPeerConnection();
        setpc(pc);
    },[])
    return(
        <rtcContext.Provider value={{pc,setpc,type,settype}}>
            {children}
        </rtcContext.Provider>
    )
}

export const useRTC=()=>{
    const rtc=useContext(rtcContext);
    return rtc;
}