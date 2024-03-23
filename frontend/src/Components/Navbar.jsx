import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

import React from "react";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const setLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-sky-950 mb-3 flex justify-between py-5 px-10 rounded-md text-black">
      <h1 className="text-2xl font-bold text-sky-200">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li className=" text-sky-200">Welcome</li>
            <li className="ml-7">
              <Link
                to="/add-tasks"
                className="bg-indigo-700 px-4 py-2 rounded text-white hover:bg-indigo-300 hover:text-indigo-700">
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => setLogout()}
                className="text-rose-200 px-4 py-2 rounded hover:bg-rose-800 hover:text-rose-100">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-indigo-700 px-4 py-2 rounded  text-white  hover:bg-indigo-300 hover:text-indigo-950">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-700 px-4 py-2 rounded  text-white  hover:bg-indigo-300 hover:text-indigo-950">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
