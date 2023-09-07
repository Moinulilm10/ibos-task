import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            Collaborative Task App
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/signup"
              className="text-white hover:bg-blue-400 px-3 py-1 rounded"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-white hover:bg-blue-400 px-3 py-1 rounded"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};
