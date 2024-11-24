import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="features-container">
      <h1>Features</h1>
      <ul className="features-list">
        <li>
          <h2>Report Lost Items</h2>
          <p>Users can report their lost belongings with detailed descriptions and get notified if a matching item is found.</p>
        </li>
        <li>
          <h2>Report Found Items</h2>
          <p>Found an item? Report it here and help someone reunite with their belongings.</p>
        </li>
        <li>
          <h2>Admin Management</h2>
          <p>Admins oversee the platform by verifying claims and ensuring fair usage of the system.</p>
        </li>
        <li>
          <h2>Secure Authentication</h2>
          <p>Secure login for students, staff, and admins with role-based access control.</p>
        </li>
        <li>
          <h2>Dynamic Filtering</h2>
          <p>Search and filter lost and found items based on categories, dates, or locations.</p>
        </li>
      </ul>
    </div>
  );
};

export default Features;
