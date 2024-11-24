import React from 'react';
import './Contact.css';
import adminImage from '../../assets/admin.png'; // Import the Admin Block image
import libraryImage from '../../assets/library.jpg'; // Import the Library image

const Contact = () => {
  return (
    <div className="contact-container1 thq-section-padding">
      <div className="contact-max-width thq-section-max-width">
        <div className="contact-content1 thq-flex-row">
          <div className="contact-content2">
            <h2 className="thq-heading-2">Campus Locations</h2>
            <p className="thq-body-large">
              Explore our campus locations where lost and found services are available. Find the help desk nearest to you.
            </p>
          </div>
        </div>
        <div className="contact-content3 thq-flex-row">
          <div className="contact-container2">
            <img
              alt="Admin Block"
              src={adminImage} // Use the imported image
              className="contact-image1 thq-img-ratio-16-9"
            />
            <h3 className="contact-text12 thq-heading-3">Admin Block</h3>
            <p className="thq-body-large">
              Visit the Admin Block for assistance with lost and found items.
            </p>
            <div className="contact-container3">
              <a
                href="https://shorturl.at/I8jyX"
                target="_blank"
                rel="noreferrer noopener"
                className="thq-body-small thq-button-flat"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="contact-container4">
            <img
              alt="Library"
              src={libraryImage} // Use the imported image
              className="contact-image2 thq-img-ratio-16-9"
            />
            <h3 className="contact-text14 thq-heading-3">Library</h3>
            <p className="thq-body-large">
              Reach out to the help desk at the library for your lost belongings.
            </p>
            <div className="contact-container5">
              <a
                href="https://shorturl.at/TBZ0x"
                target="_blank"
                rel="noreferrer noopener"
                className="thq-body-small thq-button-flat"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
