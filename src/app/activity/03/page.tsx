import Button from "@/app/components/button"
import Link from "next/link";
import "./a3.css";
;

export default async function Activity3() {
   
    return (
        <>
            <section className="a3-nav">
                <Button className="button-main" targetFunction={"logOut"}>
                    <i className='bx bx-log-out'></i>
                </Button>
                <Button className="button-main"  targetFunction={"deleteUser"}>
                    <i className='bx bxs-user-x' ></i>
                </Button>
                <Button className="button-main"  targetFunction={"GotoGithub"}>
                    <i className='bx bxl-github' ></i>
                </Button>
                <Link href="/">
                    <button className="button-main">
                        <i className='bx bx-home' ></i>
                    </button>
                </Link>
            </section>
            
            <section className="flex items-center justify-center flex-no-wrap flex-col gap-4">
                <Link href="/activity/03/add-friends">
                    <button className="button-main">
                        Add Friends
                    </button>
                </Link>
                <Link href="/activity/03/check-requests">
                    <button className="button-main">
                        Check Requests
                    </button>
                </Link>
                <Link href="/activity/03/view-secrets">
                    <button className="button-main">
                        View Secrets
                    </button>
                </Link>
                <Link href="/activity/03/edit-secret">
                    <button className="button-main">
                        Edit Personal Secret
                    </button>
                </Link>
            </section>
        </>
    )
}