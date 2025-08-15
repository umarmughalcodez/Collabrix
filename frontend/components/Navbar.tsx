import { Link } from "react-router-dom";

const Navbar = () => {
  const linkClass = (path: string) =>
    `px-4 py-2 rounded hover:bg-gray-200 transition ${
      location.pathname === path ? "font-bold text-blue-500" : "text-gray-700"
    }`;

  return (
    <div>
      <Link to={"/"} className={linkClass("/")}>
        Home
      </Link>
      <Link to={"/register"} className={linkClass("/register")}>
        Register
      </Link>
      <Link to={"/login"} className={linkClass("/login")}>
        Login
      </Link>
    </div>
  );
};

export default Navbar;
