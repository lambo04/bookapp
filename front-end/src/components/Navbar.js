// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  // Helper function to safely return the display name
  const getUserDisplayName = () => {
    // If user is an object with a name property, return that.
    if (user && typeof user === "object" && user.name) {
      return user.name;
    }
    // If user is a non-empty string, return it.
    if (typeof user === "string" && user.trim() !== "") {
      return user;
    }
    return "User";
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        BookStore
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/home">Books</Link>
        </li>
        {role === "admin" && (
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="profile-menu">
            <FaUserCircle
              className="profile-icon"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="dropdown-menu">
                <p>
                  User: {getUserDisplayName()} (Role: {role || "Unknown"})
                </p>
                <button onClick={handleLogout} className="btn-logout">
                  Sign Out
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
