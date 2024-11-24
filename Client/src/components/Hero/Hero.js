import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";
import airpodsImage from "../../assets/airpods.png"; // Import the Lost Item image
import chargerImage from "../../assets/charger.png"; // Import the Found Item image

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const imageHover = {
    hover: {
      scale: 1.1,
      rotateY: 10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.6)",
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      className="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1 variants={fadeInUp}>
        <span className="welcome-text">Welcome to </span>
        <span className="nitconnect-gradient">NITConnect</span>
      </motion.h1>
      <motion.p variants={fadeInUp}>
        Report lost items, find lost items, and connect with others on campus to
        recover your belongings.
      </motion.p>
      <motion.div className="hero-buttons" variants={fadeInUp}>
        {/* Redirect to Report Lost Items Page */}
        <Link to="/report-lost-item">
          <motion.button
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Report Lost Item
          </motion.button>
        </Link>
        {/* Redirect to Found Items Page */}
        <Link to="/found-items">
          <motion.button
            className="btn btn-outline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Lost Item
          </motion.button>
        </Link>
        {/* Redirect to Report Found Items Page */}
        <Link to="/report-found-item">
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Report Found Item
          </motion.button>
        </Link>
      </motion.div>
      <motion.div className="hero-images" variants={fadeInUp}>
        <div className="hero-image-item">
          <motion.img
            src={airpodsImage}
            alt="🔍 Recently Lost Item"
            variants={imageHover}
            whileHover="hover"
          />
          <p className="hero-image-text">🔍 Recently Lost Item</p>
        </div>
        <div className="hero-image-item">
          <motion.img
            src={chargerImage}
            alt="📋 Recently Found Item"
            variants={imageHover}
            whileHover="hover"
          />
          <p className="hero-image-text">📋 Recently Found Item</p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
