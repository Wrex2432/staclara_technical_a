'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServer, createServerAdmin } from '@/utils/supabase/server';
import { createClient } from '@/utils/supabase/client';

interface FormData {
  get: (key: string) => string | null;
}

interface User {
  id: string;
  email: string;
}

async function setUserMsg(supabase: ReturnType<typeof createClient>, user: User | any) {
  if (!user) return;

  const { data, error } = await supabase.from('st_profile').select("secret_msg").eq("user_id", user.id);
  if (error) {
    console.error('Error fetching user message:', error);
    return;
  }

  if (!data?.length) {
    const { error: insertError } = await supabase.from('st_profile').insert({ user_id: user.id, user_email: user.email });
    if (insertError) {
      console.error('Error inserting user profile:', insertError);
    }
  }
}

export async function login(formData: FormData|any) {
  const supabase = await createClient();
  const supabaseSR = await createServer();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    console.error('Email or password is missing');
    redirect('/error');
    return;
  }

  const { error } = await supabaseSR.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Error signing in:', error.message);
    redirect('/error');
    return;
  }

  const { data: { user } } = await supabaseSR.auth.getUser();
  await setUserMsg(supabase, user);

  // revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(formData: FormData) {
  const supabase = await createServer();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    console.error('Email or password is missing');
    redirect('/error');
    return;
  }

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('Error registering user:', error.message);
    redirect('/error');
    return;
  }

  revalidatePath('/login', 'page');
  redirect('/login');
}

export const logOut = async () => {
  const supabase = await createServer();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const deleteUser = async () => {
  const supabase = await createServerAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('No user found for deletion');
    return redirect('/error');
  }

  const { data, error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) {
    console.error('Error deleting user:', error.message);
  }

  return redirect("/login");
};
