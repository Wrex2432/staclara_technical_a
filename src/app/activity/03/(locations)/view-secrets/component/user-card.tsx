"use client"

import { checkRequestStatus } from "@/app/activity/activity-actions"
import Button from "@/app/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"



export default function UserCard(
  {email, secretMsg, userTarget}
: {email:string, secretMsg:string, userTarget:string}) {
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
      <div className="user-card">
          <p>{email}</p>
          {/* <p>{relationshipStatus}</p> */}
          {!relationshipStatus || relationshipStatus == "pending"? 
          <Link href={`${pathName}/${userTarget}--${relationshipStatus}`}><Button className="button-red" targetFunction={null}>View</Button></Link> :
          <Link href={`${pathName}/${userTarget}--${relationshipStatus}`}><Button className="button-green" targetFunction={null}>View</Button></Link> 

          }
      </div>
  )
}