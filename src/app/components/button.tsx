interface ButtonProps {
    children: React.ReactNode;
    targetFunction: (event: React.MouseEvent<HTMLButtonElement>) => void | React.FunctionComponent | Promise<void>;
    className: string;
}

export default function Button({
    children,
    targetFunction,
    className,
    }: ButtonProps) {
    return (
        <button onClick={targetFunction} className={className}>
        {children}
        </button>
    );
}
  