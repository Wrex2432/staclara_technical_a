import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
      redirect('/login')
  }
  
  return (
    <main className="box">
      Hello
    </main>
  );
}
