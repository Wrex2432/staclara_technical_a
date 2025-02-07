import "./a2.css";
import { getUserMsg } from "../activity-actions";
import { EditMessage } from "./activity-component/edit";
import GoToGit from "@/app/components/github-button";
import { createServer } from "@/utils/supabase/server";

export default async function Activity2() {
    const supabase = await createServer();
    const { data, error } = await supabase.auth.getUser();
    const userSecret= await getUserMsg() ?? "";
    if (error) {
        console.log(error);
    }
    return (
        <>
            <h1>Editing <span className="capitalize font-bold">{data.user?.email?.split("@")[0]}</span>&apos;s secret message</h1>
            <EditMessage userSecret={userSecret}/>
            <GoToGit targetLocation="https://github.com/Wrex2432/staclara_technical_a/tree/main/src/app/activity/02"/>
        </>
    )
}