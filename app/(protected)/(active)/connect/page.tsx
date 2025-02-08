'use client'
import React from "react";
import { useSocket } from "@/context/socketContext";
import { firebaseconfig } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
export default function Page() {
    const router=useRouter()
    const instance = firebaseconfig.getInstance();
    const [search, setsearch] = React.useState("");
    const user = instance.getCurrentUser();
    const socket = useSocket();
    const [users, setusers] = React.useState<string[]>([])
    const findUsers = users.filter(s => s.includes(search == "" ? "A" : search)).slice(0, 5);

    const handlegetuser=()=>{
        router.push(`/getuserstatus/${search}`)
    }
    React.useEffect(() => {
        socket?.emit("CameOnline", { email: user?.email });
        socket?.emit("ListAllUsers");
        socket?.on("ListOfAllUsers", (data) => {
            const allusers = data.users;
            console.log("List of all users : ", allusers)
            setusers(allusers);
        })
        
    }, [])
    return (
        <div className="w-full h-screen p-[50px]  text-[20px] font-light">
            <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} className="w-full h-[50px] border-[1px] border-[#3b0fa1] rounded-md px-[70px] text-black font-medium bg-inherit outline-[#3b0fa1]" placeholder={`Find Person to Connect to !`}  />
            <IoIosSearch className="w-[30px] h-[30px] absolute bottom-[908px] left-[70px]" />
            <div className="bg-white rounded-md mt-[20px] max-h-[500px] overflow-hidden">
                {
                    findUsers.map((users, index) => {
                        return (
                            <div className="text-[15px] px-[20px] h-[50px] w-full text-black flex items-center mt-[10px] opacity-70 cursor-pointer border-t-2 border-[#eeeeee]" key={index} onClick={() => {
                                setsearch(users)
                            }}>
                                {users}
                            </div>
                        )
                    })
                }
            </div>
            <button className="w-full h-[70px] bg-[#3b0fa1] flex items-center justify-center text-[30px] font-bold mt-[20px]  rounded-xl text-white shadow-md shadow-black" onClick={handlegetuser}>Get User Status</button>
        </div>
    )
}
// bg-[#3b0fa1]