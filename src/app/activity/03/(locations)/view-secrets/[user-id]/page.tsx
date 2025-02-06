"use client"
import { getUserMsgSpecific } from "@/app/activity/activity-actions";
import { unauthorized, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewSecret() {
    const [message, setMessage] = useState('')
    const pathName = usePathname();
    const userId = pathName.split("/")[4];
    const userName = pathName.split("--")[1];
    const userStatus = pathName.split("--")[2];
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
        <>
        <section className="secret-view">
            <h1>This is <span className="capitalize font-bold">{userName}</span>'s secret message</h1>
            <p className="container-msg">{message}</p>
        </section>
        </>
    )
}