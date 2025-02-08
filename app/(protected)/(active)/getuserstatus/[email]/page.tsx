
import React from "react";
import { UserStatus } from "@/components";

export default async function Page({params}:{params:Promise<{email:string}>}){
    const email=(await params).email;
    const decodedemail=decodeURIComponent(email);
    return(
        <UserStatus email={decodedemail}/>
    )
}