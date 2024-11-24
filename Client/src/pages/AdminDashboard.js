
import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [allItems, setAllItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null); // To capture any errors

  // Function to get JWT token
  const getToken = () => {
    return localStorage.getItem("token"); // Retrieve the token from localStorage
  };

  // Fetch all items from API
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/view-all", {
        headers: { Authorization: `Bearer ${getToken()}` }, // Use token here
      });

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      setAllItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items. Please try again.");
    }
  };

  // Fetch all claims from API
  const fetchClaims = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/view-pending-claims", {
        headers: { Authorization: `Bearer ${getToken()}` }, // Use token here
      });

      if (!response.ok) {
        throw new Error("Failed to fetch claims");
      }

      const data = await response.json();
      setClaims(data.claims || []);
    } catch (error) {
      console.error("Error fetching claims:", error);
      setError("Failed to fetch claims. Please try again.");
    }
  };

  // Handle claim actions (Approve/Reject)
  const handleClaimAction = async (claimId, action) => {
    try {
      const endpoint =
        action === "Approved"
          ? `http://localhost:5000/api/admin/approve-claim/${claimId}`
          : `http://localhost:5000/api/admin/reject-claim/${claimId}`; // Adjust reject endpoint if needed

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` }, // Use token here
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${action.toLowerCase()} the claim. Please try again.`
        );
      }

      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === claimId ? { ...claim, status: action } : claim
        )
      );
    } catch (error) {
      console.error(`Error ${action === "Approved" ? "approving" : "rejecting"} claim:`, error);
      setError(`Failed to ${action.toLowerCase()} claim. Please try again.`);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchClaims();
  }, []);
 useEffect(() => {
    fetchItems();
  }, []);
  
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error if any */}
      <div className="admin-tabs">
        <button
          className={activeTab === "items" ? "active-tab" : ""}
          onClick={() => setActiveTab("items")}
        >
          View All Items
        </button>
        <button
          className={activeTab === "claims" ? "active-tab" : ""}
          onClick={() => setActiveTab("claims")}
        >
          View All Claims
        </button>
      </div>

      {activeTab === "items" && (
        <div className="items-section">
          <h2>All Items</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {allItems.length > 0 ? (
  allItems.map((item) => (
    <tr key={item._id}>
      <td>{item._id}</td>
      <td>{item.title}</td>
      <td>{new Date(item.Date).toLocaleDateString()}</td>
      <td>{item.location}</td>
      <td>{item.category}</td>
      <td>{item.status}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6">No items found.</td>
  </tr>
)}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "claims" && (
        <div className="claims-section">
          <h2>All Claims</h2>
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Lost Item</th>
                <th>Found Item</th>
                <th>Claimed By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id}>
                  <td>{claim._id}</td>
                  <td>{claim.lost_id || "N/A"}</td>
                  <td>{claim.found_id || "N/A"}</td>
                  <td>{claim.claimedBy}</td>
                  <td>{new Date(claim.claimedAt).toLocaleDateString()}</td>
                  <td>{claim.status}</td>
                  <td>
                    {claim.status === "pending" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleClaimAction(claim._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleClaimAction(claim._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {claim.status !== "pending" && <span>{claim.status}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

