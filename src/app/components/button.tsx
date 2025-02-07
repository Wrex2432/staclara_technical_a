"use client"
import { useState } from "react";

export default function Button({
    children, 
    targetFunction, 
    className
}: {
    children: React.ReactNode, 
    targetFunction?: (() => Promise<void>) | (() => void) | null, // Supports async functions, sync functions, or links (null)
    className: string
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (isLoading) return; // Prevent multiple clicks

        setIsLoading(true);

        if (targetFunction) {
            try {
                await targetFunction(); // Executes function if provided
            } catch (error) {
                console.error("Error in button function:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // ✅ Simulate loading for links (1s delay)
            setTimeout(() => {
                setIsLoading(false);
            }, 10000);
        }
    };

    return (
        <button 
            onClick={handleClick} 
            className={`${className} ${isLoading ? "cursor-not-allowed" : ""}`} 
            disabled={isLoading}  // Disable while loading
        >
            {isLoading ? <LoadingSpinner /> : children} {/* Show spinner when loading */}
        </button>
    );
}

// Simple Loading Spinner Component
function LoadingSpinner() {
    return (
        <i className='animate-spin bx bx-loader-alt'></i>
    );
}
