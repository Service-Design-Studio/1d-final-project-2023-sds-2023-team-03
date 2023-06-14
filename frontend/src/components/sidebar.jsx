import React, { useState } from 'react';
import { VscMenu } from "react-icons/vsc";

function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  const handleLogout = () => {
    // Add your logout functionality here
  };

  const handleHomeClick = () => {
    // Add your logic for Home button click
  };

  const handleAboutClick = () => {
    // Add your logic for About button click
  };

  const handleContactClick = () => {
    // Add your logic for Contact button click
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Stop click event propagation
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <ul className={`${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
          <>
            <li onClick={handleHomeClick}>Home</li>
            <li onClick={handleAboutClick}>About</li>
            <li onClick={handleContactClick}>Contact</li>
          </>
        )}
        <li>
          <li onClick={toggleDropdown}>
            Competitor
            <span>{isDropdownOpen ? '▲' : '▼'}</span>
          </li>
          {isDropdownOpen && (
            <ul className="dropdown">
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          )}
        </li>
      </ul>
      {isExpanded && (
        <div className="logout-button">
          <li onClick={handleLogout}>Logout</li>
        </div>
      )}
      <div className="react-icon" onClick={toggleExpand}>
        <VscMenu />
      </div>
    </div>
  );
}

export default Sidebar;
