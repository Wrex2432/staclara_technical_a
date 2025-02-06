import "./a1.css";
import { getUserMsg } from "../activity-actions";
import { createServer } from "@/utils/supabase/server";
import GoToGit from "@/app/components/github-button";


export default async function Activity1() {
    const supabase = await createServer();
    const { data, error } = await supabase.auth.getUser();
    const userSecret:any = await getUserMsg();

    return (
        <>
        <section className="secret-view">
            <h1>This is <span className="capitalize font-bold">{data.user?.email?.split("@")[0]}</span>'s secret message</h1>
            <p className="container-msg">{userSecret}</p>
        </section>
        <GoToGit targetLocation="https://github.com/Wrex2432/staclara_technical_a/tree/main/src/app/activity/01"/>
        </>

    )
}