'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServer, createServerAdmin } from '@/utils/supabase/server'
import { createClient } from '@/utils/supabase/client'


export async function login(formData: FormData) {
  const supabase = await createClient();
  const supabaseSR = await createServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabaseSR.auth.signInWithPassword(data)

  const { data: { user } } = await supabaseSR.auth.getUser()
  const setUserMsg = async () => {
      const { data, error } = await supabase.from('st_profile').select("secret_msg").eq("user_id", user?.id);
      if (!data?.length) {
          const { data, error } = await supabase.from('st_profile').insert({user_id:user?.id,user_email:user?.email});
          return;
      }
  }
  await setUserMsg();
      

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function register(formData: FormData) {
  const supabase = await createServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/login', 'page')
  redirect('/login')
}

export const logOut= async () => {
  const supabase = await createServer();
  await supabase.auth.signOut();
  return redirect("/login");
};
export const deleteUser = async () => {
  const supabase = await createServerAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  const user_id:any = user?.id;
  
  const { data, error } = await supabase.auth.admin.deleteUser(
    user_id
  )
  console.log(error)
  
  return redirect("/login");
};

