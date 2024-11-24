import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CTA.css';

function CTA() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="cta-section">
      <h2 className="cta-heading">Take Action Now!</h2>
      <p className="cta-text">
        Report lost items or browse found items to help reconnect with what matters.
      </p>
      <div className="cta-buttons">
        <button
          className="cta-button primary"
          onClick={() => navigate('/report-lost-item')} // Redirect to Report Lost Items page
        >
          Report Lost Item
        </button>
        <button
          className="cta-button secondary"
          onClick={() => navigate('/found-items')} // Redirect to Found Items page
        >
          View Found Items
        </button>
      </div>
    </div>
  );
}

export default CTA;
