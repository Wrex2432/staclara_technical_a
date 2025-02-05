export default function Button({
    children, targetFunction, className 
}: {
    children: React.ReactNode, 
    targetFunction: React.FunctionComponent | any ,
    className : string
}){
    return (
        <button onClick={targetFunction} className={className}>
            {children}
        </button>
    )
}
