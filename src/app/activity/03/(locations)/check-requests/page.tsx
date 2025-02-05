import { createServer } from "@/utils/supabase/server";
import UserCard from "./component/user-card";

export default async function FriendRequests() {
    const supabase = await createServer();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("st_request").select('*').eq('user_target', user?.id).eq('request_status', 'pending');
    // console.log(data)

    return (
        <section className="user-dashboard">
            {data?.map(e=>(
                <UserCard
                    key={e.id}
                    email={e.user_origin_email.split('@')[0]}
                    userTarget_id={e.user_origin}

                />
            ))}

            
        </section>
    )
    
}