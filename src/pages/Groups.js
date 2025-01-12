import React, { useState } from "react";
import { userAxios } from "../helper/axiosHelper";
import { debounce } from "lodash";
import "../utils/tabs.scss";
import "../utils/Friends.scss"; // Import the newly created Friends.scss file

function Groups() {
  const [activeTab, setActiveTab] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for adding friend

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchUsers = async (query) => {
    if (!query) {
      setUsers([]);
      return;
    }
    setIsLoading(true);
    setError(null); // Reset error
    try {
      const response = await userAxios.get(`?search=${query}`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of fetchUsers with a 1-second delay
  const debouncedFetchUsers = debounce(fetchUsers, 1000);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchUsers(query); // Use the debounced function
  };

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user for the "Add Friend" toggle
  };

  const handleAddFriend = () => {
    // Simulate adding a friend (this should be replaced by actual API call)
    console.log(`Friend request sent to ${selectedUser.username}`);
    setSelectedUser(null); // Reset selected user after adding
  };

  return (
    <div className="tabs">
      <p className="h1 text-center mt-30">Friends</p>

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

      <div className="tab-content">
        {activeTab === "Search" && (
          <div>
            <input
              className="fs-14 ml-30 login-input input-search"
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="error-text text-center">{error}</p>}
            {/* Friend suggestions dropdown */}
            {users.length > 0 && (
              <ul className="suggestion-secondary">
                {users.map((user) => (
                  <li key={user.id} onClick={() => handleUserClick(user)}>
                    {user.username} ({user.first_name} {user.last_name} )
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "Requests" && (
          <div>
            <p className="text-center mt-30">You have no pending requests.</p>
          </div>
        )}
        {activeTab === "Friends" && (
          <div>
            <p className="text-center mt-30">Your friends list is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
