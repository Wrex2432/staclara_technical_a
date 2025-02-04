import Button from "@/app/components/button"
import Link from "next/link";
import "./a1.css";
import { getUserMsg } from "../activity-actions";


export default async function Activity1() {
    const userSecret= await getUserMsg();

    return (
        <main className="box a1-main">
            <section className="a1-nav">
                <Button targetFunction={"logOut"}>
                    <i className='bx bx-log-out'></i>
                </Button>
                <Button targetFunction={"deleteUser"}>
                    <i className='bx bxs-user-x' ></i>
                </Button>
                <Button targetFunction={"GotoGithub"}>
                    <i className='bx bxl-github' ></i>
                </Button>
                <Link href="/">
                    <button className="button-main">
                        <i className='bx bx-home' ></i>
                    </button>
                </Link>
            </section>
            <section>
                <p>{userSecret}</p>
            </section>

        </main>
    )
}