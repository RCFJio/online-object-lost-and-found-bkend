import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = ({ isLoggedIn, role }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Load profile data from localStorage
  const [profilePic, setProfilePic] = useState(() =>
    localStorage.getItem("profilePic") || "https://via.placeholder.com/150"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "User Profile"
  );

  // Handle Navbar hiding on scroll
  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) setDropdownOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle Admin Access
  const handleAdminAccess = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      alert("Access Denied! Only admins can access this page.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.clear(); // Clear all stored user data
    navigate("/signin");
    window.location.reload(); // Force page reload to reset state
  };

  return (
    <nav className={`navbar ${isHidden ? "navbar-hidden" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <img className="navbar-logo-img" src={logo} alt="NITConnect Logo" />
        <span className="navbar-logo-text">NITConnect</span>
      </div>

      {isLoggedIn && (
        <>
          {/* Navigation Links */}
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/found-items"
                className={({ isActive }) =>
                  isActive ? "active-link" : ""
                }
              >
                Found Items
              </NavLink>
            </li>
            {role === "admin" && (
              <li>
                <button className="admin-link" onClick={handleAdminAccess}>
                  Admin
                </button>
              </li>
            )}
            <li className="dropdown">
              <div
                className="dropdown-trigger"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <img className="profile-pic" src={profilePic} alt="User Profile" />
                <span>{userName}</span> {/* Display dynamic username */}
              </div>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                    >
                      View & Edit Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="navbar-buttons">
            <Link to="/report-lost-item" className="btn">
              Report Lost Item
            </Link>
            <Link to="/view-my-reports" className="btn-outline">
              View My Reports
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
