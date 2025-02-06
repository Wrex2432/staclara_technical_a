"use client"
import { useState } from "react";
import { updateSecret } from "@/app/activity/activity-actions";


interface SecretMessage {
    userSecret: string;
}
export function EditMessage({userSecret}:SecretMessage) {
    const [secretMessage, SetSecretMessage] = useState(userSecret)
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        const updatedText = e.target.value;
        // updateSecret(updatedText);
        SetSecretMessage(updatedText);
    };


    return (
        <form action={updateSecret}>
                <textarea 
                    className="container-msg"
                    name="secret-text-input" 
                    onChange={handleChangeText}
                    value={secretMessage}
                />
                <button className="button-main">Save</button>
                {/* <button type="submit" className="a2-button">Save</button> */}
        </form>
    )
}