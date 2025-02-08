'use client'
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { SocketProvider } from "@/context/socketContext";
import { RtcProvider } from "@/context/rtcContext";
import { GeneralLoader } from "@/components";
export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const [loading, setloading] = React.useState(true);
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/auth/signin")
            }
            else setloading(false);
        })
    }, [onAuthStateChanged])
    return (
        loading ? (
            <GeneralLoader/>
        ) : (
            <>
                <SocketProvider>
                    <RtcProvider>
                        {children}
                    </RtcProvider>
                </SocketProvider>
            </>
        )
    )
}