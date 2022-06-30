import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="sticky top-0 p-sm z-50 bg-white border-b-2 border-neutral-200">
      <span className="mr-sm">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : undefined)}
        >
          Home
        </NavLink>
      </span>
      <span className="mr-sm">
        <NavLink
          to="/applications"
          className={({ isActive }) => (isActive ? "text-primary" : undefined)}
        >
          Applications
        </NavLink>
      </span>
      <span className="mr-sm">
        <NavLink
          to="/user"
          className={({ isActive }) => (isActive ? "text-primary" : undefined)}
        >
          User
        </NavLink>
      </span>
    </header>
  );
}
