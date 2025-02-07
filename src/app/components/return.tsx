"use client";
import Link from "next/link";
import { useState } from "react";

export default function ReturnTo({ hrefTarget }: { hrefTarget: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        window.location.href = hrefTarget; 
    };

    return (
        <nav className="nav-return">
            <Link href={hrefTarget}>
                <button
                    className={`button-main ${isLoading ? "cursor-not-allowed" : ""}`}
                    onClick={handleClick}
                >
                    {isLoading ? <LoadingSpinner /> : <i className="bx bxs-arrow-to-left"></i>}
                </button>
            </Link>
        </nav>
    );
}

function LoadingSpinner() {
    return (
        <i className="animate-spin bx bx-loader-alt"></i>
    );
}
