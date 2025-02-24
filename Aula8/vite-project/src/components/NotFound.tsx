import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
        <h1>
            Page not found!
        </h1>
        <Link
    to={{
    pathname: "/",
  }}>Home</Link>
    </div>
  )
}