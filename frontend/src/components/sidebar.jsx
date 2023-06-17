import React, { useState } from 'react';
import { VscMenu } from 'react-icons/vsc';
import Dropdown from './Competitor.jsx';
import './Sidebar.css'

function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const toggleExpand = () => {
    setExpanded(!isExpanded);
    setDropdownOpen(false); // Close dropdown when sidebar minimizes
  };

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    setDropdownOpen(false); // Close dropdown when sidebar minimizes
  };

  const handleLogout = () => {
    // Add your logout functionality here
  };

  const handleHomeClick = () => {
    // Add your logic for Home button click
  };
  const handleInternalClick = () => {
    // Add your logic for About button click
  };
  const handleExternalClick = () => {
    // Add your logic for About button click
  };

  const handleContactClick = () => {
    // Add your logic for Contact button click
  };

  const options = ['Adidas', 'Nike', 'Asics', 'Skechers', 'Overall']; // Options list for dropdown box

  return (
    <div
      className={`sidebar w-60 bg-gray-900 text-white transition-all duration-300 overflow-hidden ${
        isExpanded ? 'expanded' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className={`${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
          <>
            <li  onClick={handleHomeClick}>
              <AiOutlineHome/>
              Home            
            </li>
            <li onClick={handleInternalClick}>Internal</li>
            <li onClick={handleExternalClick}>External</li>
          </>
        )}
        <Dropdown
          isExpanded={isExpanded}
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          options={options}
        />
      </ul>
      {isExpanded && (
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div className="react-icon">
        <VscMenu />
      </div>
    </div>
  );
}
export default Sidebar;
