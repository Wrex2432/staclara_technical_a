"use client"
import "./activity.css"
import Button from "../components/button";
import Link from "next/link";
import { logOut } from "../(auth)/auth-actions";
import { usePathname } from "next/navigation";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathname = usePathname();
    const setLimit = pathname.split('/')[3];

    return (
        <main className="box activity">
          {!setLimit &&
            <header>
              <nav className="activity-nav-top">
                  <Link href="/">
                      <button className="button-main">
                          <i className='bx bx-home' ></i>
                      </button>
                  </Link>
                  <Button className="button-main" targetFunction={logOut}>
                      <i className='bx bx-log-out'></i>
                  </Button>
                  <Link href={"/confirm/delete"}>
                    <button className="button-main">
                      <i className='bx bxs-user-x' ></i>
                    </button>
                  </Link>
              </nav>
            </header>
          }
          {children}
          
        </main>
    );
  }