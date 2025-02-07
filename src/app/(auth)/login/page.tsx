import Link from "next/link";
import { login } from "../auth-actions";
import "../auth.css";

export default function Login() {
    return (
        <main className="box-login">
            <form className="box__elements">
                <h1>Login</h1>

                <ul className="box__inputs">
                    <li>
                        <i className="bx bxs-envelope"></i>
                        <input
                            type="email"
                            className="inputs"
                            name="email"
                            placeholder="Email ID"
                            required
                        />
                    </li>
                    <li>
                        <i className="bx bx-lock"></i>
                        <input
                            type="password"
                            className="inputs"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </li>
                </ul>

                <div className="box__login">
                    <button formAction={login} className="button" type="submit">
                        Login
                    </button>
                </div>

                <p className="box__register">
                    Don't have an account?
                    <Link href="/register">&nbsp;Register</Link>
                </p>
            </form>
        </main>
    );
}
