"use client"

import { checkRequestStatus } from "@/app/activity/activity-actions"
import Button from "@/app/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"



export default function UserCard(
  {email, userTarget}
: {email:string, userTarget:string}) {
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const pathName = usePathname();
  useEffect(()=> {
    const getStatus = async () => {
        const thing = await checkRequestStatus(userTarget);
        setRelationshipStatus(thing);
    }
    getStatus();
  },[])
  return (
      <div className="user-card background-static">
        <figure>
          <img className="background-static" src="https://picsum.photos/200" alt="placeholder_profile" />
        </figure>
        <div className="user-card-actions">
          <p>{email}</p>
          {!relationshipStatus || relationshipStatus == "pending"? 
          <Link href={`${pathName}/${userTarget}--${email}--${relationshipStatus}`}><Button className="button-red">View</Button></Link> :
          <Link href={`${pathName}/${userTarget}--${email}--${relationshipStatus}`}><Button className="button-green">View</Button></Link> 
          }
        </div>
      </div>
  )
}