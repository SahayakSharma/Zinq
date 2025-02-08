
import React, { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext=createContext<Socket|null>(null);

export const SocketProvider = ({children} : {children:React.ReactNode}) =>{
    const socket=useMemo(()=>io("ws://15.207.3.86:3000"),[]);
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket=()=>{
    const socket=useContext(SocketContext);
    return socket;
}

