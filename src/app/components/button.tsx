export default function Button({
    children, 
    targetFunction, 
    className 
}: {
    children: React.ReactNode, 
    targetFunction?: (() => Promise<void>) | (() => void), // ✅ Make it optional
    className: string
}) {
    return (
        <button 
            onClick={() => targetFunction && targetFunction()} // ✅ Call only if function exists
            className={className}
        >
            {children}
        </button>
    );
}
