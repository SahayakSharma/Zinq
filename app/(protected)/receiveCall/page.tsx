'use client';
import AudioVideoToggle from "@/components/Call/AudioVideoToggle";
import { firebaseconfig } from "@/config/firebase";
import { useSocket } from "@/context/socketContext";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function ReceiveCall(){
    const temp=useSearchParams();
    const email=temp.get("email");
    const fb=firebaseconfig.getInstance();
    const user=fb.getCurrentUser();
    const socket=useSocket();
    const ownVideoRef=useRef<HTMLVideoElement>(null);
    const secondPersonVideo=useRef<HTMLVideoElement>(null);
    // const [userStream,setuserstream]=useState<MediaStream|null>(null)
    async function HandleCam(pc:RTCPeerConnection){
        const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
        // setuserstream(stream);
        pc.addTrack(stream.getVideoTracks()[0]);
        if(ownVideoRef.current){
            ownVideoRef.current.srcObject=stream;
        }
    }
    useEffect(()=>{
        socket?.emit("CameOnline",{email:user?.email});
        socket?.emit("CallAnswered",{senderEmail:user?.email,receiverEmail:email});
        const pc=new RTCPeerConnection();
        HandleCam(pc);
        pc.onicecandidate=(event)=>{
            console.log("Ice Candidates Popped Up. Sending to the other side !")
            if(event.candidate){
                console.log("Ice candidate Appeared. Sending them the other side !")
                socket?.emit("SendIceCandidates",{candidates:event.candidate,senderEmail:user?.email,receiverEmail:email});
            }
        }
        pc.ontrack=(event)=>{
            console.log("Track Received !")
            if(secondPersonVideo.current){
                secondPersonVideo.current.srcObject=new MediaStream([event.track]);
            }
        }
        
        socket?.on("offerReceived",async(data)=>{
            console.log("Offer Received")
            const offer=data.offer;
            const senderEmail=data.senderEmail;
            const receiverEmail=data.receiverEmail;
            const audio=data.audio;
            const video=data.video;
            await pc.setRemoteDescription(offer);
            const answer=await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log("Answer Generated and sent to the other side !")
            socket?.emit("answerGenerated",{answer:pc.localDescription,senderEmail:user?.email,receiverEmail:senderEmail,audio:audio,video:video});
        })
        socket?.on("IceCandidates",async(data)=>{
            console.log("Ice Candidates Received and added !")
            const candidates=data.candidates;
            await pc.addIceCandidate(candidates);
        })
    })
    return(
        <div className="flex w-[80%] mx-auto h-screen items-center justify-around">
            <video ref={ownVideoRef} autoPlay playsInline className="w-[640px] h-[480px] border-2 border-white rounded-md"></video>
            <video ref={secondPersonVideo} autoPlay playsInline className="w-[640px] h-[480px] border-2 border-white rounded-md"></video>
            {/* <AudioVideoToggle userStream={userStream}/> */}
        </div>
    )
}