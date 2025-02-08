'use client';
import React, { useEffect,useState, useRef } from "react";
import { firebaseconfig } from "@/config/firebase";
import { useSocket } from "@/context/socketContext";
import AudioVideoToggle from "./AudioVideoToggle";
export default function OnCall({ email }: { email: string }) {
    const fb = firebaseconfig.getInstance();
    const user = fb.getCurrentUser();
    const socket = useSocket();
    const ownVideoRef = useRef<HTMLVideoElement>(null);
    const secondPersonVideo = useRef<HTMLVideoElement>(null);
    const [userStream,setuserstream]=useState<MediaStream|null>(null)
    async function handleCam(pc: RTCPeerConnection) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setuserstream(stream)
        console.log("My Track Added!")
        pc.addTrack(stream.getVideoTracks()[0]);
        if (ownVideoRef.current) {
            ownVideoRef.current.srcObject = stream;
        }
    }
    async function handleCallInit(pc: RTCPeerConnection) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket?.emit("offerGenerated", {
            offer: pc.localDescription,
            senderEmail: user?.email,
            receiverEmail: email,
            audio: true,
            video: true
        })
        console.log("Offer Generated and Sent !")
    }
    useEffect(() => {
        
        const pc = new RTCPeerConnection();
        handleCam(pc);
        pc.onnegotiationneeded = () => {
            handleCallInit(pc);
        }
        pc.ontrack = (event) => {
            console.log("Track Received")
            if (secondPersonVideo.current) {
                secondPersonVideo.current.srcObject = new MediaStream([event.track]);
            }
        }
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Ice candidate Appeared. Sending them the other side !")
                socket?.emit("SendIceCandidates", { candidates: event.candidate, senderEmail: user?.email, receiverEmail: email });
            }
        }
        socket?.on("answerReceived", async (data) => {
            console.log("Answer Received and Set Remote Desc. !")
            const answer = data.answer;
            const senderEmail = data.senderEmail;
            const receiverEmail = data.receiverEmail;
            const audio = data.audio;
            const video = data.video;

            await pc.setRemoteDescription(answer);
        })

        socket?.on("IceCandidates", async (data) => {
            console.log("Ice Candidates Received and added !")
            const candidates = data.candidates;
            await pc.addIceCandidate(candidates);
        })
    }, [])
    return <div>
        <video ref={ownVideoRef} autoPlay playsInline className="w-[300px] h-[230px] rounded-md absolute left-[1500px] top-[670px] border-2 border-white"></video>
        <video ref={secondPersonVideo} autoPlay playsInline className="w-[95%] mx-auto h-[940px] mt-[10px] rounded-md border-2 border-white"></video>
        {/* <AudioVideoToggle userStream={userStream}/> */}
    </div>
}