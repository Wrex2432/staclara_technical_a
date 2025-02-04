export default function Button({
    children, targetFunction
}: {
    children: React.ReactNode, 
    targetFunction: React.FunctionComponent | any ,
}){
    return (
        <button onClick={targetFunction} className="button-main">
            {children}
        </button>
    )
}
