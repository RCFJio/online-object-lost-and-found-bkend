import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        <p>
          <strong>Email:</strong> support@nitconnect.com
        </p>
        <p>
          <strong>Phone:</strong> +91-123-456-7890
        </p>
        <p>
          <strong>Location:</strong> NIT Calicut, Kerala, India
        </p>
      </div>
    </div>
  );
};

export default Contact;
