import Button from "@/app/components/button"
import Link from "next/link";

import { getUserMsg } from "@/app/activity/activity-actions";
import { EditMessage } from "./activity-component/edit";
export default async function EditSecret() {
    const userSecret= await getUserMsg();
    return (
        <section className="flex items-center justify-center flex-no-wrap flex-col gap-4">
            <EditMessage userSecret={userSecret}/>
        </section>
    )
}