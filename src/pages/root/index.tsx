import { Link, Outlet } from "react-router";
export default function Root() {
  return (
    <>
      <header>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
