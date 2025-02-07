"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServer, createServerAdmin } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";

// Define types for user data
interface AuthData {
  email: string;
  password: string;
}

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const supabaseSR = await createServer();

  // Validate formData before type assertion
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    // redirect("/login?error=Invalid%20credentials");
    return;
  }

  const data: AuthData = { email, password };
  const { error } = await supabaseSR.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=Invalid%20credentials");
    return;
  }

  const { data: userResponse } = await supabaseSR.auth.getUser();
  const user = userResponse?.user;

  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from("st_profile")
      .select("secret_msg")
      .eq("user_id", user.id);

    if (!profileData?.length && !profileError) {
      await supabase.from("st_profile").insert({
        user_id: user.id,
        user_email: user.email,
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(formData: FormData): Promise<void> {
  const supabase = await createServer();

  // Validate formData before type assertion
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/error");
    return;
  }

  const data: AuthData = { email, password };
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
    return;
  }

  revalidatePath("/login", "page");
  redirect("/login");
}

export async function logOut(): Promise<void> {
  const supabase = await createServer();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function deleteUser(): Promise<void> {
  const supabase = await createServerAdmin();
  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse?.user;

  if (!user) {
    redirect("/error");
    return;
  }

  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) {
    console.error("Error deleting user:", error);
  }

  redirect("/login");
}
