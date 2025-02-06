import Link from "next/link"
import Button from "./button"


export default function GoToGit({targetLocation}:{targetLocation:string}) {

    return (
        <footer>
            <nav className="activity-nav-bottom">
              <Link href={targetLocation} target="_blank">
                <Button className="button-main" targetFunction={null}>
                  <i className='bx bxl-github' ></i>
                </Button>
              </Link>
            </nav>
          </footer>
    )
}