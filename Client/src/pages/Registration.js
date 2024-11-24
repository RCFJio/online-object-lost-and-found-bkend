import React, { useState } from "react";
import "./Registration.css";

const Registration = () => {
  const [user_id, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!user_id || !email || !password || !mobile || !role) {
      setErrorMessage("All fields are required.");
      setSuccessMessage("");
      return;
    }

    // Prepare the user data
    const userDetails = {
      user_id,
      email,
      password,
      mobile,
      role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrorMessage("");
        // Reset form fields
        setUserId("");
        setEmail("");
        setPassword("");
        setMobile("");
        setRole("user");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="registration-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;

