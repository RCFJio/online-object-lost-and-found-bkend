import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-logo">NITConnect</h3>
          <p className="footer-description">
            Your trusted campus platform for lost and found items. Connecting students to make the campus a better place.
          </p>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>Email: <a href="mailto:support@nitconnect.com">support@nitconnect.com</a></li>
            <li>Phone: +91-123-456-7890</li>
            <li>Location: NIT Calicut, Kerala, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 NITConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
