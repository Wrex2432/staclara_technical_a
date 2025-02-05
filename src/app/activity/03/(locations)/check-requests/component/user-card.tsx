"use client"
import { confirmReq, deleteReq } from "@/app/activity/activity-actions"
import Button from "@/app/components/button"



export default function UserCard({email, userTarget_id}: {email:string, userTarget_id:string}) {

    const handleConfirm = () => {
        confirmReq(userTarget_id);
    }
    const handleDeny = () => {
        deleteReq(userTarget_id);
    }

    return (
        <div className="user-card">
            <img src="https://picsum.photos/200" alt="" />
            <p>{email}</p>
            {/* <p>{userTarget_id}</p> */}
            <Button className="button-green" targetFunction={handleConfirm}><i className='bx bx-check'></i></Button>
            <Button className="button-red" targetFunction={handleDeny}><i className='bx bx-x' ></i></Button>
        </div>
    )
}