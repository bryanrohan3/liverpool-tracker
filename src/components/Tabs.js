import React, { useState } from "react";
import PropTypes from "prop-types";
import "../utils/tabs.scss"; // Import the SCSS file for styling

function Tabs({ tabs }) {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <div className="tabs">
      {/* Tab Buttons */}
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tab-button ${currentTab === tab.name ? "active" : ""}`}
            onClick={() => setCurrentTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Dynamically render content based on the active tab */}
        {tabs.map((tab) =>
          currentTab === tab.name ? (
            <div key={tab.name}>{tab.content}</div>
          ) : null
        )}
      </div>
    </div>
  );
}

// Define the prop types for the Tabs component
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;
