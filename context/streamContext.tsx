'use client'
import React,{useContext,createContext,useState, SetStateAction, Dispatch, useEffect} from "react";

type streamContextType={
    stream:MediaStream|null,
    setstream:Dispatch<SetStateAction<MediaStream |null>>
}
const StreamContext=createContext<streamContextType | null>(null)


export const StreamProvider=({children}:{children:React.ReactNode})=>{
    const [stream,setstream]=useState<MediaStream|null>(null);
    async function startStream() {
        const temp=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setstream(temp)
        console.log("Provided value to stream")
    }
    useEffect(()=>{
        startStream()
    },[])
    return(
        <StreamContext.Provider value={{stream,setstream}}>
        {children}
        </StreamContext.Provider>
    )
}

export const useStream=()=>{
    const stream=useContext(StreamContext);
    return stream;
}