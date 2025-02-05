import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";
import UserCard from "./component/user-card";

export default async function FriendsDashboard() {
    const supabase = await createServer();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("st_profile").select('*').neq('user_id', user?.id);
    // console.log(data)

    return (
        <section className="user-dashboard">
            {/* {data?.map(e=>(
                <ul>
                    <li>{e.user_id}</li>
                    <li>{e.user_email.split('@')[0]}</li>
                    <li>{e.secret_msg}</li>
                </ul>
            ))} */}
            {data?.map(e=>(
                <UserCard
                    key={e.user_id}
                    email={e.user_email.split('@')[0]}
                    userTarget_id={e.user_id}
                />
            ))}

            
        </section>
    )
    
}