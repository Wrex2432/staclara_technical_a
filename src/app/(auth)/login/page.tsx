"use client"
import Link from "next/link";
import { login } from "../auth-actions";
import "../auth.css";
import { useState, useEffect } from "react";


export default function Login() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Check the query parameters for error message
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get("error");
        if (error) {
            setErrorMessage("Invalid credentials. Please try again.");
        }
    }, [loading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null); // Clear any previous error message
        
        const formData = new FormData(e.currentTarget);
        try {
            await login(formData);
        } catch (error) {
            setErrorMessage('Invalid credentials. Please try again.'); // Show error message if login fails
        } 
        setLoading(false); // This won't run if `login` redirects the user

    };

    return (
        <main className="box-login">
            <form className="box__elements" onSubmit={handleSubmit}>
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

                {errorMessage && (
                    <p className="error-message text-center" style={{ color: 'red' }}>
                        {errorMessage}
                    </p>
                )}

                <div className="box__login">
                    <button className="box-login-button" type="submit" disabled={loading}>
                        {loading ? 
                            "Logging in..." : 
                            "Login"}
                    </button>
                </div>

                <p className="box__register">
                    Don&apos;t have an account?
                    <Link href="/register">&nbsp;Register</Link>
                </p>
            </form>
        </main>
    );
}
