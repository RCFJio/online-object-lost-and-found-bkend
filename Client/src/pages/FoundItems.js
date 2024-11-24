
/*import React, { useState, useEffect } from "react";
import "./FoundItems.css";

const FoundItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch Found Items on Filter Change
  useEffect(() => {
    fetchFoundItems();
  }, [filters]);

  const fetchFoundItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "found",
        ...(filters.category && { category: filters.category }),
        ...(filters.location && { location: filters.location }),
      });

      const response = await fetch(`http://localhost:5000/api/items/find?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch found items.");
      }
    } catch (error) {
      console.error("Error fetching found items:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPotentialMatches = async (currentItem) => {
    try {
      const params = new URLSearchParams({
        status: "found",
        category: currentItem.category,
        location: currentItem.location,
      });

      const response = await fetch(`http://localhost:5000/api/items/find?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        return data.filter((match) => match._id !== currentItem._id); // Exclude the current item
      } else {
        console.error("Failed to fetch potential matches.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching potential matches:", error);
      return [];
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleItemClick = async (item) => {
    const potentialMatches = await getPotentialMatches(item);
    setSelectedItem({ ...item, potentialMatches });
  };

  const uniqueCategories = ["", ...new Set(items.map((item) => item.category))];
  const uniqueLocations = ["", ...new Set(items.map((item) => item.location))];

  return (
    <div className="found-items-container">
      <h1>Found Items</h1>
      <div className="filter-options">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category || "All"}
            </option>
          ))}
        </select>

        <label>Location:</label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location || "All"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="items-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="card"
                onClick={() => handleItemClick(item)}
              >
                <h3>{item.title}</h3>
                <p>Location: {item.location}</p>
                <p>Category: {item.category}</p>
                <p>Posted By: {item.postedBy}</p>
                {item.imageURL && <img src={item.imageURL} alt={item.title} />}
              </div>
            ))
          ) : (
            <p>No items found matching your filters.</p>
          )}
        </div>
      )}

      {// Modal for Item Details }
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2>{selectedItem.title}</h2>
            <p>Category: {selectedItem.category}</p>
            <p>Location: {selectedItem.location}</p>
            <h3>Potential Matches</h3>
            <ul>
              {selectedItem.potentialMatches?.length > 0 ? (
                selectedItem.potentialMatches.map((match) => (
                  <li key={match._id}>
                    {match.title} - {match.location} - {match.category}
                  </li>
                ))
              ) : (
                <p>No potential matches found.</p>
              )}
            </ul>
            <button onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundItems;*/
import React, { useState, useEffect } from "react";
import "./FoundItems.css";

const FoundItems = () => {
  const [items, setItems] = useState([]);
  const [userLostItems, setUserLostItems] = useState([]); // User's lost items
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch Found Items on Filter Change
  useEffect(() => {
    fetchFoundItems();
    fetchUserLostItems(); // Fetch lost items of the user
  }, [filters]);

  const fetchFoundItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "found",
        ...(filters.category && { category: filters.category }),
        ...(filters.location && { location: filters.location }),
      });

      const response = await fetch(`http://localhost:5000/api/items/find?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch found items.");
      }
    } catch (error) {
      console.error("Error fetching found items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLostItems = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/items/lost-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserLostItems(data);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch user lost items.");
      }
    } catch (error) {
      console.error("Error fetching user lost items:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClaim = async (foundItemId, lostItemId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/claim/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lost_id: lostItemId,
          found_id: foundItemId,
        }),
      });

      if (response.ok) {
        alert("Claim filed successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to file the claim.");
      }
    } catch (error) {
      console.error("Error filing claim:", error);
      alert("An error occurred while filing the claim. Please try again.");
    }
  };

  const uniqueCategories = ["", ...new Set(items.map((item) => item.category))];
  const uniqueLocations = ["", ...new Set(items.map((item) => item.location))];

  return (
    <div className="found-items-container">
      <h1>Found Items</h1>
      <div className="filter-options">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category || "All"}
            </option>
          ))}
        </select>

        <label>Location:</label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location || "All"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="items-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="card">
                <h3>{item.title}</h3>
                <p>Location: {item.location}</p>
                <p>Category: {item.category}</p>
                <p>Posted By: {item.postedBy}</p>
                {item.imageURL && <img src={item.imageURL} alt={item.title} />}
                <button onClick={() => setSelectedItem(item)}>File Claim</button>
              </div>
            ))
          ) : (
            <p>No items found matching your filters.</p>
          )}
        </div>
      )}

      {/* Modal for Filing Claim */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2>File Claim for: {selectedItem.title}</h2>
            <p>Select your lost item to file the claim:</p>
            <select
              onChange={(e) => handleClaim(selectedItem._id, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select your lost item
              </option>
              {userLostItems.map((lostItem) => (
                <option key={lostItem._id} value={lostItem._id}>
                  {lostItem.title}
                </option>
              ))}
            </select>
            <button onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundItems;

