"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";

const supabase = await createClient();
const supabaseSR = await createServer();
const { data: { user } } = await supabaseSR.auth.getUser();

export async function getUserMsg(){
    const getMsg = async () => {
        const { data, error } = await supabase.from('st_profile').select("secret_msg").eq("user_id", user?.id);
        if (data) {
            return data[0].secret_msg;
        }else{
            return error
        }
        
    }
    return getMsg();
}

export async function updateSecret(formData: FormData): Promise<void> {
    const {error} = await supabase.from('st_profile').update({secret_msg:formData.get("secret-text-input")}).eq('user_id', user?.id);
    if (error) console.error(error);

    console.log(formData.get("secret-text-input"));
    // revalidatePath("/activity/02");
}