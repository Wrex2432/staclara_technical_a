import Link from "next/link";
import "./a3.css";
import GoToGit from "@/app/components/github-button";
import { createServer } from "@/utils/supabase/server";
import Button from "@/app/components/button";
export default async function Activity3() {
    const supabase = await createServer();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
    }
    return (
        <>  
            <h1 className="activity-title"><span className="capitalize font-bold">{data.user?.email?.split("@")[0]}</span>&apos;s dashboard</h1>
            <nav className="flex items-center justify-center flex-no-wrap flex-col gap-4">
                <Link href="/activity/03/add-friends">
                    <Button className="button-main">
                        Add Friends
                    </Button>
                </Link>
                <Link href="/activity/03/check-requests">
                    <Button className="button-main">
                        Check Requests
                    </Button>
                </Link>
                <Link href="/activity/03/view-secrets">
                    <Button className="button-main">
                        View Secrets
                    </Button>
                </Link>
                <Link href="/activity/03/edit-secret">
                    <Button className="button-main">
                        Edit Personal Secret
                    </Button>
                </Link>
            </nav>
            
            <GoToGit targetLocation="https://github.com/Wrex2432/staclara_technical_a/tree/main/src/app/activity/03"/>
        </>
    )
}