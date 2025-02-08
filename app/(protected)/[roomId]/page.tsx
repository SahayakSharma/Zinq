import React from "react";
import { MeetRoom } from "@/components";
export default async function Room({params}:{params:Promise<{roomId:string}>}){
    const roomId=(await params).roomId
    return(
        <div>
            
        </div>
    )
}