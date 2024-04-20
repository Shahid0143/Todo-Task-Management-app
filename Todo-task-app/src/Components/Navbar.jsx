import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";

function Navbar() {
  const location = useLocation();
  const [access, setAccess] = useState(localStorage.getItem("logintoken"));
  const navigate = useNavigate();

  useEffect(() => {
    setAccess(localStorage.getItem("logintoken"));
  }, []);

  const handleTaskClick = () => {
    if (access) {
      navigate("/task");
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("logintoken");
    setAccess(null);
    navigate("/");
  };

  return (
    <nav className="nav p-md-3 flex items-center justify-center gap-24 shadow-md">
      <div className=" absolute left-4">
        <img
          className="h-10 w-10 rounded-full"
          src="https://cdn.dribbble.com/userupload/14065873/file/original-513d55523c61ea561bb0ff3307a5d2d0.jpg?resize=1024x768"
          alt="Profile"
        />
      </div>
      <Link
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        to="/"
      >
        Home
      </Link>

      <span
        onClick={handleTaskClick}
        className={` cursor-pointer   nav-link ${
          location.pathname === "/task" ? "active" : ""
        }`}
        to="/task"
      >
        Task
      </span>

      {access ? (
        <span
          onClick={logout}
          className={`nav-link ${
            location.pathname === "/signup" ? "active" : ""
          }`}
          to="/signup"
        >
          Logout
        </span>
      ) : (
        <Link
          className={`nav-link ${
            location.pathname === "/login" ? "active" : ""
          }`}
          to="/login"
        >
          Login
        </Link>
      )}

      <div className="flex items-center absolute right-6 gap-6">
        <button
          className="nav-icon"
          onClick={() => {
            // Handle notification click
          }}
        >
          <FiBell style={{ fontSize: "1.5rem" }} />
        </button>
        <div className="relative">
          <img
            className="h-10 w-10 rounded-full"
            src="https://i.pinimg.com/736x/88/2a/69/882a69ba218a96552bc68a99ca410198.jpg"
            alt="Profile"
          />
          {access && (
            <div className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
