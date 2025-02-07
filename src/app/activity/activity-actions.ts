"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/client";
import { createServer } from "@/utils/supabase/server";

export async function getUserMsg(): Promise<string | null> {
  const supabase = await createClient();
  const supabaseSR = await createServer();

  const { data, error } = await supabaseSR.auth.getUser();
  if (error || !data?.user) return null;

  const { data: profileData, error: profileError } = await supabase
    .from("st_profile")
    .select("secret_msg")
    .eq("user_id", data.user.id)
    .single();

if (profileError) {
    console.log(profileError);
}

  return profileData?.secret_msg ?? null;
}

export async function getUserMsgSpecific(userTargetId: string): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("st_profile")
    .select("secret_msg")
    .eq("user_id", userTargetId)
    .single();
if (error) {
    console.log(error);
}

  return data?.secret_msg ?? null;
}

export async function updateSecret(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const supabaseSR = await createServer();

  const { data, error } = await supabaseSR.auth.getUser();
  if (error || !data?.user) return;

  const secretMsg = formData.get("secret-text-input");
  if (typeof secretMsg !== "string") return;

  const { error: updateError } = await supabase
    .from("st_profile")
    .update({ secret_msg: secretMsg })
    .eq("user_id", data.user.id);

  if (updateError) console.error("Error updating secret message:", updateError);
}

export async function sendFriendRequest(userTargetId: string): Promise<void> {
  const supabaseSR = await createServer();
  const { data, error } = await supabaseSR.auth.getUser();
  if (error || !data?.user) return;

  const { data: existingRequest } = await supabaseSR
    .from("st_request")
    .select("*")
    .eq("user_origin", data.user.id)
    .eq("user_target", userTargetId);

  if (!existingRequest || existingRequest.length === 0) {
    const { error: insertError } = await supabaseSR.from("st_request").insert({
      user_origin: data.user.id,
      user_target: userTargetId,
      user_origin_email: data.user.email,
    });

    if (insertError) console.error("Error sending friend request:", insertError);
  } else {
    console.log("Friend request already sent.");
  }

  revalidatePath("/activity/03/add-friends");
}

export async function checkRequestStatus(userTargetId: string): Promise<string> {
  const supabase = await createServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return "";

  const { data: requestData } = await supabase
    .from("st_request")
    .select("request_status")
    .or(`user_origin.eq.${userTargetId}, user_target.eq.${userTargetId}`)
    .or(`user_origin.eq.${data.user.id}, user_target.eq.${data.user.id}`)
    .single();

  return requestData?.request_status ?? "";
}

export async function confirmReq(userTargetId: string): Promise<void> {
  const supabase = await createServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return;

  const { error: updateError } = await supabase
    .from("st_request")
    .update({ request_status: "accepted" })
    .eq("user_target", data.user.id)
    .eq("user_origin", userTargetId);

  if (updateError) console.error("Error confirming request:", updateError);
}

export async function deleteReq(userTargetId: string): Promise<void> {
  const supabase = await createServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return;

  const { error: deleteError } = await supabase
    .from("st_request")
    .delete()
    .eq("user_target", data.user.id)
    .eq("user_origin", userTargetId);

  if (deleteError) console.error("Error deleting request:", deleteError);
}
