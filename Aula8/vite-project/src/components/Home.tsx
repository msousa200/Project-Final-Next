import { Link } from "react-router";

export default function Home() {
  const random = Math.random()
  return (
    <div>
      <h1 style={{ fontSize: '40px' }}>
        This is the Home Page
      </h1>
      <Link
    to={{
    pathname: `/about/${random}`,
  }}>About</Link>
    </div>
  );
}