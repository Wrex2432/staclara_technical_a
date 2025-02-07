
import { createServer } from "@/utils/supabase/server";
import UserCard from "./component/user-card";

export default async function FriendsDashboard() {
    const supabase = await createServer();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("st_profile").select('*').neq('user_id', user?.id);
    if (error) {
        console.log(error);
    }

    return (
        <>
        <h2>Add a friend:</h2>
        <section className="user-dashboard">
            {data?.map(e=>(
                <UserCard
                    key={e.user_id}
                    name={e.user_email.split('@')[0]}
                    userTarget_id={e.user_id}
                />
            ))}
        </section>
        </>
    )
    
}