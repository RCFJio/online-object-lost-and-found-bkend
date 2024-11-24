import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = ({ setIsLoggedIn, setRole, setUserName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store JWT token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("role", data.role);
        localStorage.setItem("isLoggedIn", true);

        // Update app state
        setIsLoggedIn(true);
        setRole(data.role);
        setUserName(data.name);

        // Redirect to appropriate page
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirect to home page
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid email or password.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>

      <p className="signup-link">
        New here? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
