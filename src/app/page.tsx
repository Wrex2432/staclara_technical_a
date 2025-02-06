import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./components/button";
import { logOut } from "./(auth)/auth-actions";
import "./css/perso.css";
import "./css/globals.css";

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
        <div className="global-nav-items">
          <Button className="button-main" targetFunction={logOut}>
            <i className='bx bx-log-out'></i>
          </Button>
          <Link href={"/confirm/delete"}>
            <button className="button-main">
              <i className='bx bxs-user-x' ></i>
            </button>
          </Link>
        </div>
      </section>
 
      <h1 className="capitalize text-5xl font-bold">Hello {data?.user.email?.split('@')[0]}</h1>

      <section className="dashboard-nav">
        <ul>
          <li>
            <Link href="/activity/01">
              <button className="button-main">
                <span>1</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 1 - View Secret Message</p>
          </li>
          <li>
            <Link href="/activity/02">
              <button className="button-main">
                <span>2</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 2 - Edit Secret Message</p>
          </li>
          <li>
            <Link href="/activity/03">
              <button className="button-main">
                <span>3</span>
                <i className='bx bx-cog' ></i>
              </button>
            </Link>
            <p className="text-3xl pl-5">Activity 3 - Add, View, Edit Actions</p>
          </li>
        </ul>

      </section>
      <footer>
        <nav className="activity-nav-bottom">
          <Link href={"https://github.com/Wrex2432/staclara_technical_a/tree/main/src/app"} target="_blank">
            <button className="button-main">
              <i className='bx bxl-github' ></i>
            </button>
          </Link>
        </nav>
      </footer>
    </main>
  );
}


/* 

className="flex items-center justify-center flex-no-wrap p-4"
className="flex items-center justify-center flex-no-wrap p-4"
className="flex items-center justify-center flex-no-wrap p-4"
*/