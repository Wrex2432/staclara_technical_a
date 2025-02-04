import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./components/button";
import { deleteUser, logOut } from "./(auth)/auth-actions";
import "./css/perso.css"
import Link from "next/link";


export default async function Home() {
  const supabase = await createServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
      redirect('/login')
  }

  
  return (
    <main className="box index">
      <section className="global-nav">
        <Button targetFunction={logOut}>
          <i className='bx bx-log-out'></i>
        </Button>
        <Button targetFunction={"deleteUser"}>
          <i className='bx bxs-user-x' ></i>
        </Button>
      </section>
      <h1 className="capitalize">Hello {data?.user.email?.split('@')[0]}</h1>
 

      <section className="dashboard-nav">
        <ul>
          <li className="flex items-center justify-center flex-no-wrap p-4">
            <Link href="/activity/01">
              <button className="button-main">
                <span>1</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 1</p>
          </li>
          <li className="flex items-center justify-center flex-no-wrap p-4">
            <Link href="/activity/02">
              <button className="button-main">
                <span>2</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 2</p>
          </li>
          <li className="flex items-center justify-center flex-no-wrap p-4">
            <Link href="/activity/03">
              <button className="button-main">
                <span>3</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 3</p>
          </li>
        </ul>

      </section>
    </main>
  );
}
