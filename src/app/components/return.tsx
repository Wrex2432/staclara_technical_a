import Link from "next/link"

export default function ReturnTo({hrefTarget}:{hrefTarget:string}) {
    return(
        <nav className="nav-return">
            <Link href={hrefTarget}>
                <button className="button-main">
                    <i className='bx bxs-arrow-to-left' ></i>
                </button>
            </Link>
        </nav> 
    )
}