import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import CTA from '../components/CTA/CTA';
import Steps from '../components/Steps/Steps';
import Testimonial from '../components/Testimonial/Testimonial';
import Contact from '../components/Contact/Contact';
import './Home.css';

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('');

  // Simulate user data fetch
  useEffect(() => {
    const fetchUserName = async () => {
      const user = { name: 'User' }; 
      setUserName(user.name);

      const popupDismissed = localStorage.getItem('popupDismissed');
      if (!popupDismissed) {
        setShowPopup(true); // Show popup if not dismissed
      }
    };

    fetchUserName();
  }, []);

  // Auto-hide the popup after 5 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        localStorage.setItem('popupDismissed', 'true');
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showPopup]);

  return (
    <div>
      {/* Animated Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Welcome, {userName}!</h2>
              <p>We’re glad to have you back. Explore our platform to manage your lost and found items.</p>
              <button
                className="btn"
                onClick={() => {
                  setShowPopup(false);
                  localStorage.setItem('popupDismissed', 'true');
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <Hero />
      <Features />
      <CTA />
      <Steps />
      <Testimonial />
      <Contact />
    </div>
  );
}

export default Home;



