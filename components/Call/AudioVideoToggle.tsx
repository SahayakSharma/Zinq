'use client'
import React, { useState } from "react";

export default function AudioVideoToggle({userStream}:{userStream:MediaStream | null}){
    const [audio,setaudio]=useState<boolean>(true);
    const [video,setvideo]=useState<boolean>(true);

    async function handleVideoToggle(){
        console.log("video toggle init")
        const videoStream=userStream?.getTracks().find(track=>track.kind==="video");
        
        if(videoStream?.enabled===true){
            console.log("disabling video")
            videoStream.enabled=false;
            console.log("This is video track after disabling : ",videoStream)
            setvideo(false);
        }
        else if(videoStream?.enabled===false){
            console.log("Enabling video")
            if(videoStream?.enabled===false){
                videoStream.enabled=true
            }
            setvideo(true);
        }
        else console.log("else working")
    }
    async function handleAudioToggle(){
        const audioTrack=userStream?.getTracks().find(track=>track.kind==="audio");
        if(audioTrack?.enabled){
            audioTrack.enabled=false;
            setaudio(false);
        }
        else{
            if(audioTrack?.enabled===false){
                audioTrack.enabled=true
            }
            setaudio(true);
        }
    }
    console.log("This is userstream for toggling : ",userStream)
    return(
        <div className="w-[300px] border-white border-2 ">
            <button onClick={handleVideoToggle}>{video?"Hide Video":"Show Video"}</button>
            <button onClick={handleAudioToggle}>{audio?"Hide Audio":"Show Audio"}</button>
        </div>
    )
}