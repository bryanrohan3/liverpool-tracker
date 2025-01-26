import React, { useState, useEffect, useCallback } from "react";
import { userAxios } from "../helper/axiosHelper";
import { debounce } from "lodash";
import "../utils/tabs.scss";
import "../utils/Friends.scss";

function Groups() {
  const [activeTab, setActiveTab] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("You must log in to use this feature.");
    }
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchUsers = async (query) => {
    if (!query) {
      setUsers([]);
      return;
    }
    console.log("Search Query:", query); // Log the search query
    setIsLoading(true);
    setError(null); // Reset error
    try {
      const response = await userAxios.get(`users/?search=${query}`);
      console.log("Response Data:", response.data); // Log the response data
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err); // Log the error details
    } finally {
      setIsLoading(false);
    }
  };

  // Create debounced function wrapped with useCallback to prevent re-creating it on every render
  const debouncedFetchUsers = useCallback(
    debounce((query) => fetchUsers(query), 1000),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchUsers(query); // Call the debounced version of fetchUsers
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleAddFriend = () => {
    console.log(`Friend request sent to ${selectedUser.username}`);
    setSelectedUser(null);
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
            {!error ? (
              <>
                <input
                  className="fs-14 ml-30 login-input input-search"
                  type="text"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {isLoading && <p className="text-center">Loading...</p>}
                {users.length > 0 && (
                  <ul className="suggestion-secondary">
                    {users.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => handleUserClick(user)}
                        className="pointer"
                      >
                        {user.username} ({user.first_name} {user.last_name})
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="error-text text-center">{error}</p>
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
