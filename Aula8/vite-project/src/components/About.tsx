import { Link, useParams } from "react-router";

export default function About() {
  const params = useParams()
  return (
    <div>
        <h1>
            This is the About page
        </h1>
        <p>Id: {params.id}</p>
        <Link
    to={{
    pathname: "/",
  }}>Home</Link>
  </div> 
  )
}