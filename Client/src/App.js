import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import FoundItems from "./pages/FoundItems";
import ReportLostItem from "./pages/ReportLostItem";
import ReportFoundItem from "./pages/ReportFoundItem"; // Import the Report Found Item page
import ViewMyReports from "./pages/ViewMyReports";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import About from "./pages/About"; // Import the About page
import Features from "./pages/Features"; // Import the Features page
import Contact from "./pages/Contact"; // Import the Contact page

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [userName, setUserName] = useState("Guest");

  // Load initial state from localStorage
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedRole = localStorage.getItem("role") || "";
    const storedUserName = localStorage.getItem("userName") || "Guest";

    setIsLoggedIn(storedLoggedIn);
    setRole(storedRole);
    setUserName(storedUserName);
  }, []);

  return (
    <Router>
      {/* Navbar receives dynamic props */}
      <Navbar isLoggedIn={isLoggedIn} role={role} profilePic={profilePic} userName={userName} />

      <Routes>
        {!isLoggedIn ? (
          <>
            {/* Redirect all unauthenticated requests to SignIn */}
            <Route
              path="*"
              element={<Navigate to="/signin" replace />}
            />
            <Route
              path="/signin"
              element={
                <SignIn
                  setIsLoggedIn={setIsLoggedIn}
                  setRole={setRole}
                  setUserName={setUserName}
                />
              }
            />
            <Route path="/register" element={<Registration />} />
          </>
        ) : (
          <>
            {/* Authenticated Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/found-items" element={<FoundItems />} />
            <Route path="/report-lost-item" element={<ReportLostItem />} />
            <Route path="/report-found-item" element={<ReportFoundItem />} /> {/* Report Found Item */}
            <Route path="/view-my-reports" element={<ViewMyReports />} />
            <Route
              path="/profile"
              element={
                <Profile
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                  userName={userName}
                  setUserName={setUserName}
                />
              }
            />
            <Route path="/about" element={<About />} /> {/* About Page */}
            <Route path="/features" element={<Features />} /> {/* Features Page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
            {role === "admin" && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </>
        )}
      </Routes>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
};

export default App;
