"use client"
import { getUserMsgSpecific } from "@/app/activity/activity-actions";
import { unauthorized, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewSecret() {
    const [message, setMessage] = useState('')
    const pathName = usePathname();
    const userId = pathName.split("/")[4];
    const userStatus = pathName.split("--")[1];
    if (userStatus != "accepted") {
        unauthorized();
    }
    useEffect(()=>{
        const handleGetMsg = async () => {
            // return ;
            const data = await getUserMsgSpecific(userId.split("--")[0])
            setMessage(data);
        }
        handleGetMsg();
    },[])
    return (
        <div>
            {message}
        </div>
    )
}