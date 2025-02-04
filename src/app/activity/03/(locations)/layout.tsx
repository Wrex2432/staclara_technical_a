import Link from "next/link";
import "@/app/activity/03/a3.css";
export default function LocationsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return (
        <>
            <nav className="nav-03">
                <Link href="/activity/03/">
                    <button className="button-main">
                        <i className='bx bxs-arrow-to-left' ></i>
                    </button>
                </Link>
            </nav> 
            {children}
        </>
    );
  }