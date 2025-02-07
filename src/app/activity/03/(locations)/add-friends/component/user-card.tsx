"use client"
import { checkRequestStatus, sendFriendRequest } from "@/app/activity/activity-actions";
import Button from "@/app/components/button";
import { useEffect, useState } from "react";

export default function UserCard({ name, userTarget_id }: { name: string; userTarget_id: string }) {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getStatus = async () => {
            const thing = await checkRequestStatus(userTarget_id);
            setStatus(thing);
        };
        getStatus();
    }, [userTarget_id]); // ✅ Add dependency to avoid warnings

    const handleSubmit = () => {  // ✅ Remove event parameter
        sendFriendRequest(userTarget_id);
    };

    return (
        <div className="user-card background-static">
            <figure>
                <img className="background-static" src="https://picsum.photos/200" alt="placeholder_profile" />
            </figure>
            <div className="user-card-actions">
                <p>{name}</p>
                {status === "pending" ? (
                    <button className="button-main" disabled>{status}</button>
                ) : status === "accepted" ? (
                    <button className="button-green" disabled>{status}</button>
                ) : (
                    <Button className="button-main" targetFunction={handleSubmit}>
                        <i className="bx bx-plus"></i>
                    </Button>
                )}
            </div>
        </div>
    );
}
