import React, { useState } from "react";
import "./ReportFoundItem.css";

const ReportFoundItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Select Location");
  const [category, setCategory] = useState("Electronics"); // Default category
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = [
    "Library",
    "Cafeteria",
    "Lecture Hall",
    "Sports Complex",
    "Hostel",
    "Parking Lot",
    "Other",
  ];

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Personal Belongings",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || location === "Select Location") {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("status", "found"); // Explicitly set status to "found"
    if (image) {
      formData.append("image", image); // Append the image if it exists
    }
    try {
      const response = await fetch("http://localhost:5000/api/items/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add the JWT token
        },
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        alert("Item reported successfully!");
        setTitle("");
        setDescription("");
        setLocation("Select Location");
        setCategory("Electronics");
        setImage(null);
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

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="report-found-item-container">
      <h1>Report Found Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="Select Location" disabled>
              Select Location
            </option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`image-dropzone ${dragOver ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <p>Uploaded Image: {image.name}</p>
          ) : (
            <p>Drag and drop an image here or click to upload</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Report Item"}
        </button>
      </form>
    </div>
  );
};

export default ReportFoundItem;
