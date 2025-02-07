"use client"
import Link from "next/link";
import { register } from "../auth-actions";
import "../auth.css";
import { useState } from "react";
export default function Register() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        await register(formData);

        setLoading(false); // This won't run if `register` redirects the user
    };

    return (
        <main className="box-login">
            <form className="box__elements" onSubmit={handleSubmit}>
                <h1>Register</h1>

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
                            minLength={6}
                            required={true}
                        />
                    </li>
                </ul>

                <div className="box__login">
                    <button className="box-login-button" type="submit" disabled={loading}>
                        {loading ? 
                            "Registering..." : 
                            "Register"}   
                    </button>
                </div>

                <p className="box__register">
                    Already have an account?
                    <Link href="/login">&nbsp;Login</Link>
                </p>
            </form>
        </main>
    );
}
