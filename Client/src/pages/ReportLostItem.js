
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ReportLostItem.css";

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "Electronics", // Default category
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/items/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, status: "lost" }), // Explicitly set status to "lost"
      });

      if (response.ok) {
        setSuccessMessage("Lost item reported successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          category: "Electronics",
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to report the item.");
      }
    } catch (error) {
      console.error("Error reporting item:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.querySelector("input[name='title']").focus();
  }, []);

  return (
    <motion.div
      className="report-lost-item-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="report-lost-item-form">
        <label>
          Item Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Personal Belongings">Personal Belongings</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <div className="loading-spinner"></div> : "Submit"}
        </motion.button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </motion.div>
  );
};

export default ReportLostItem;
