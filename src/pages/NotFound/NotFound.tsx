import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
}
