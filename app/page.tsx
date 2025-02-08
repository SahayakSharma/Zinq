
import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full h-screen flex">
      {/* <Link href="/auth/signin">Signin</Link> */}
      <div className="w-[50%] h-full bg-[#3b0fa1] opacity-50"></div>
      <div className="w-[50%] h-full flex flex-col items-center justify-center text-[30px] text-white font-bold">
          <div className="w-[50%] h-[100px] rounded-md bg-[#3b0fa1] opacity-50 flex items-center justify-center hover:opacity-100">
            <Link href="/auth/signin">Login to Account</Link> 
          </div>
          <div className="w-[50%] h-[100px] rounded-md bg-[#3b0fa1] opacity-50 flex items-center justify-center mt-[20px] hover:opacity-100">
            <Link href="/auth/signup">Create a New Account</Link> 
          </div>
      </div>
      
    </div>
  );
}
