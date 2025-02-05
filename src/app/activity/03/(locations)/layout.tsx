"use client"
import Link from "next/link";
import "@/app/activity/03/a3.css";
import { usePathname } from "next/navigation";
export default function LocationsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathName = usePathname();
    const locationPath = pathName.split('/')[4];

    return (
        <>
        { locationPath ?
            <nav className="nav-03">
                <Link href="/activity/03/view-secrets">
                    <button className="button-main">
                        <i className='bx bxs-arrow-to-left' ></i>
                    </button>
                </Link>
            </nav> 
            :
            <nav className="nav-03">
                <Link href="/activity/03/">
                    <button className="button-main">
                        <i className='bx bxs-arrow-to-left' ></i>
                    </button>
                </Link>
            </nav> 
        }
            {children}
        </>
    );
  }