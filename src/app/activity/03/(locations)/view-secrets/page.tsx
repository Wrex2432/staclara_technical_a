import { createServer } from "@/utils/supabase/server";
import UserCard from "./component/user-card";



export default async function ViewSecrets() {
    const supabase = await createServer();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('st_profile')
    .select(`*`)
    .neq('user_id', user?.id);


    return (
        <>
        <h2>View Secrets:</h2>
        <section className="user-dashboard">
            {data?.map((e:any)=>(
                <UserCard
                key={e.user_id}
                email={e.user_email.split('@')[0]}
                secretMsg={e.secret_msg}
                userTarget={e.user_id}
                
                />
                
            ))}

            
        </section>
        </>
    )
    
}