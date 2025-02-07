import { deleteUser } from "@/app/(auth)/auth-actions";
import Button from "@/app/components/button";
import '@/app/css/perso.css';
import ReturnTo from "@/app/components/return";


export default function DeleteUserSelf(){
    return(
        <main className="box confirm-delete">
            <ReturnTo hrefTarget="/"/>
            <section className="flex items-center justify-center flex-no-wrap p-4 flex-col gap-4">
                <h2 className="text-2xl">Are you sure you want to delete your account?</h2>
                <Button className="button-red" targetFunction={deleteUser}>DELETE</Button>
            </section>
        </main>
    )
}