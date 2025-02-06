"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";



export async function getUserMsg(){
    const supabase = await createClient();
    const supabaseSR = await createServer();
    const { data: { user } } = await supabaseSR.auth.getUser();
    const getMsg = async () => {
        const { data, error } = await supabase
            .from('st_profile')
            .select("secret_msg")
            .eq("user_id", user?.id);
        if (data) {
            return data[0].secret_msg;
        }else{
            return error;
        }
    }
    return getMsg();
}
export async function getUserMsgSpecific(userTarget_id:string){
    const supabase = await createClient();
    const getMsg = async () => {
        const { data, error } = await supabase
            .from('st_profile')
            .select("secret_msg")
            .eq("user_id", userTarget_id);
        if (data) {
            return data[0].secret_msg;
        }else{
            return error;
        }
    }
    return getMsg();
}

export async function updateSecret(formData: FormData): Promise<void> {
    const supabase = await createClient();
    const supabaseSR = await createServer();
    const { data: { user } } = await supabaseSR.auth.getUser();
    const {error} = await supabase.from('st_profile').update({secret_msg:formData.get("secret-text-input")}).eq('user_id', user?.id);
    if (error) console.error(error);

    console.log(formData.get("secret-text-input"));
}

export async function sendFriendRequest(userTarget_id:string) {
    const supabase = await createClient();
    const supabaseSR = await createServer();
    const { data: { user } } = await supabaseSR.auth.getUser();
    const {data, error} = await supabaseSR.from('st_request').select("*").eq("user_origin",user?.id).eq("user_target",userTarget_id);
    if (data?.length == 0) {
        const { data, error } = await supabase
            .from('st_request')
            .insert({ user_origin:user?.id, user_target:userTarget_id, user_origin_email:user?.email});
        console.log("no sent")
        console.log(error)
        revalidatePath('/activity/03/add-friends');
    } else {
        console.log("already sent")
    }
}

export async function checkRequestStatus(userTarget_id:any) {
    const supabase = await createServer();
    const { data: { user } } = await supabase.auth.getUser();
    const {data, error}:any = await supabase.from("st_request").select("*")
    .or(`user_origin.eq.${userTarget_id}, user_target.eq.${userTarget_id}`)
    .or(`user_origin.eq.${user?.id}, user_target.eq.${user?.id}`);
    if (data?.length != 0) {
        return(data[0].request_status);
    } else {
        return "";
    }
    
}



export async function confirmReq(userTarget_id:any) {
    const supabase = await createServer();
    const supabaseSr = await createServer();
    const { data: { user } } = await supabaseSr.auth.getUser();
    const {data, error}:any = await supabase
        .from("st_request")
        .update({request_status:"accepted"})
        .eq('user_target',user?.id)
        .eq('user_origin',userTarget_id);
    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data)
    }
}
export async function deleteReq(userTarget_id:any) {
    const supabase = await createServer();
    const supabaseSr = await createServer();
    const { data: { user } } = await supabaseSr.auth.getUser();
    const {data, error}:any = await supabase
        .from("st_request")
        .delete()
        .eq('user_target',user?.id)
        .eq('user_origin',userTarget_id);
    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data)
    }
}   
