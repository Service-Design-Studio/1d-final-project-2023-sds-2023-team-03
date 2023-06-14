import React, { useState } from 'react';
import { VscMenu } from 'react-icons/vsc';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';


function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent elements
    setExpanded(!isExpanded);
    setDropdownOpen(false); // Close dropdown when sidebar minimizes
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
  const options = ['nike', 'adidas', 'skechers']; // Options list for dropdown box

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
        <Dropdown isExpanded={isExpanded} isDropdownOpen={isDropdownOpen} setDropdownOpen={setDropdownOpen} options={options} />
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
