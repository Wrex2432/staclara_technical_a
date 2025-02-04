import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";

export default async function FriendsDashboard() {
    const supabase = await createServer();
    const { data, error } = await supabase.from("st_profile").select('*');
    console.log(data)

    return (
        <section>
            hello
        </section>
    )
    
}