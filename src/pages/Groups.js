import React, { useState } from "react";
import "../utils/tabs.scss";

function Groups() {
  const [activeTab, setActiveTab] = useState("Search");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs">
      <p className="h1 text-center mt-30">Friends</p>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "Search" ? "active" : ""}`}
          onClick={() => handleTabClick("Search")}
        >
          Search
        </button>
        <button
          className={`tab-button ${activeTab === "Requests" ? "active" : ""}`}
          onClick={() => handleTabClick("Requests")}
        >
          Requests
        </button>
        <button
          className={`tab-button ${activeTab === "Friends" ? "active" : ""}`}
          onClick={() => handleTabClick("Friends")}
        >
          Friends
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "Search" && (
          <div>
            <input
              className="fs-14 input input-search"
              type="text"
              placeholder="Search by username..."
            />
          </div>
        )}
        {activeTab === "Requests" && (
          <div>
            <p className="text-center">You have no pending requests.</p>
          </div>
        )}
        {activeTab === "Friends" && (
          <div>
            <p className="text-center">Your friends list is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
