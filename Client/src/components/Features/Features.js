import React, { useState } from 'react';
import './Features.css';
import reportImage from '../../assets/report.png'; // Import the images
import connectImage from '../../assets/connect.png';
import centralImage from '../../assets/central.png';

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const featuresData = [
    {
      title: 'Easy Reporting',
      description:
        'Easily report lost items on campus with our streamlined interface. Post item details and increase the chances of finding them.',
      image: reportImage, // Use imported image
    },
    {
      title: 'Connect with Finders',
      description:
        'Get in touch with people who might have found your lost items. A quick and simple way to retrieve your belongings.',
      image: connectImage, // Use imported image
    },
    {
      title: 'Centralized Platform',
      description:
        'A single place to manage and track all lost and found items within your campus. Convenient and user-friendly.',
      image: centralImage, // Use imported image
    },
  ];

  return (
    <div className="features-container">
      <div className="features-tabs">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`features-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {feature.title}
          </div>
        ))}
      </div>
      <div className="features-content">
        <div className="features-description">
          <h2>{featuresData[activeTab].title}</h2>
          <p>{featuresData[activeTab].description}</p>
        </div>
        <div className="features-image">
          <img
            src={featuresData[activeTab].image}
            alt={featuresData[activeTab].title}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
