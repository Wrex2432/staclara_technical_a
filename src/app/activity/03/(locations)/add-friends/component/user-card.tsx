"use client"
import { checkRequestStatus, sendFriendRequest } from "@/app/activity/activity-actions"
import Button from "@/app/components/button"
import { useEffect, useState } from "react"


export default function UserCard({email, userTarget_id}: {email:string, userTarget_id:string}) {
    const [status, setStatus] = useState('');

    useEffect(()=> {
        const getStatus = async () => {
            const thing = await checkRequestStatus(userTarget_id);
            setStatus(thing);
        }
        getStatus();
        
    },[])
    // console.log(status);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        sendFriendRequest(userTarget_id);
    }

    return (
        <div className="user-card">
            <img src="https://picsum.photos/200" alt="" />
            <p>{email}</p>
            {
            status === "pending" ? 
                <div>
                    <button className="button-main" disabled>{status}</button> 
                    <button className="button-red" disabled>cancel</button> 
                </div>
            : 
            status === "accepted" ?
                <button className="button-green" disabled>{status}</button> 
            : 
                <Button className="button-main" targetFunction={handleSubmit}><i className='bx bx-plus' ></i></Button>
            }
        </div>
    )
}