import Link from "next/link";
import "./a3.css";
import GoToGit from "@/app/components/github-button";
import { createServer } from "@/utils/supabase/server";

export default async function Activity3() {
    const supabase = await createServer();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
    }
    return (
        <>  
            <h1><span className="capitalize font-bold">{data.user?.email?.split("@")[0]}</span>&apos;s dashboard</h1>
            <nav className="flex items-center justify-center flex-no-wrap flex-col gap-4">
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
            </nav>
            
            <GoToGit targetLocation="https://github.com/Wrex2432/staclara_technical_a/tree/main/src/app/activity/03"/>
        </>
    )
}