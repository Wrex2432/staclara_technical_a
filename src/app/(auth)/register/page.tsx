import Link from "next/link";
import "../auth.css"
import { register } from "../auth-actions";


export default function Register() {
    return (
    <main className="box">
        <form className="box__elements">
            <h1> Register </h1>

            <ul className="box__inputs">
                <li>
                    <i className='bx bxs-envelope'></i>
                    <input type="text" className="inputs" name="email" placeholder="Email ID"/>
                </li>
                <li>
                    <i className='bx bx-lock'></i>
                    <input type="text" className="inputs" name="password" placeholder="Password"/>
                </li>
            </ul>
            
            <div className="box__login">
                <button formAction={register} className="button">Register</button>
            </div>

            <p className="box__register">
                Already have an account? <Link href="/login">&nbsp;Login</Link>
            </p>
            
        </form>
    </main>
    )
}