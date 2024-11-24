import React from 'react';
import './Steps.css';

function Steps() {
  const steps = [
    {
      title: 'Report a Lost Item',
      description: 'Fill out a form with details of your lost item and submit it.',
      icon: '🔍',
    },
    {
      title: 'Browse Found Items',
      description: 'Search through the list of found items posted by others.',
      icon: '📋',
    },
    {
      title: 'Reclaim Your Item',
      description: 'Contact the person who found your item and arrange for retrieval.',
      icon: '🤝',
    },
  ];

  return (
    <div className="steps-section">
      <h2 className="steps-heading">How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Steps;
