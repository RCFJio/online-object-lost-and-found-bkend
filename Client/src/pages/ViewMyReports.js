/*import React, { useState, useEffect } from "react";
import "./ViewMyReports.css";

const ViewMyReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const mockData = [
      { id: 1, title: "Lost AirPods", date: "2024-11-18", status: "Pending" },
      { id: 2, title: "Lost Wallet", date: "2024-11-15", status: "Found" },
    ];
    setTimeout(() => {
      setReports(mockData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "All" || report.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="view-my-reports-container">
      <h1>My Reports</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Found">Found</option>
        </select>
      </div>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <ul>
          {filteredReports.map((report) => (
            <li key={report.id}>
              <h3>{report.title}</h3>
              <p>Date: {report.date}</p>
              <p>
                Status:{" "}
                <span
                  className={`status-badge ${
                    report.status === "Pending"
                      ? "status-pending"
                      : "status-found"
                  }`}
                >
                  {report.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMyReports;*/
import React, { useState, useEffect } from "react";
import "./ViewMyReports.css";

const ViewMyReports = () => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchClaims(); // Fetch user claims on component mount
  }, []);

  const fetchClaims = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token"); // JWT token from local storage

    try {
      const response = await fetch("http://localhost:5000/api/claim/user-claims", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClaims(data || []); // Assuming the API returns an array of claims
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to fetch user claims.");
      }
    } catch (error) {
      console.error("Error fetching user claims:", error);
      alert("An error occurred while fetching your claims. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.lost_id.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.found_id.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "All" || claim.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="view-my-reports-container">
      <h1>My Claims</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <ul>
          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim) => (
              <li key={claim._id}>
                <h3>Lost Item: {claim.lost_id.title}</h3>
                <p>Location: {claim.lost_id.location}</p>

                <h3>Matched Found Item</h3>
                <p>Found Item: {claim.found_id.title}</p>
                <p>Location: {claim.found_id.location}</p>
                {claim.found_id.image && (
                  <img
                    src={`http://localhost:5000/${claim.found_id.image}`}
                    alt={claim.found_id.title}
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                )}

                <p>
                  Status:{" "}
                  <span
                    className={`status-badge ${
                      claim.status === "pending"
                        ? "status-pending"
                        : claim.status === "approved"
                        ? "status-approved"
                        : "status-rejected"
                    }`}
                  >
                    {claim.status}
                  </span>
                </p>
                <p>Claimed At: {new Date(claim.claimedAt).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No claims found for the logged-in user.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ViewMyReports;

