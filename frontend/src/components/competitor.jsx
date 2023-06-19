import React, { useState } from 'react';
import {BiMask} from 'react-icons/bi'
import 'tailwindcss/tailwind.css';

function Dropdown({ isExpanded, isDropdownOpen, setDropdownOpen, options }) {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent elements
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isExpanded && (
        <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <BiMask className="sbicon" />
          Competitors
        </li>
      )}
      {(isDropdownOpen || isHovered) && (
  <ul className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    {options.map((option, index) => (
      <li key={index} className={option === 'Overall' ? 'overall-option' : ''}>{option}</li>
    ))}
  </ul>
)}
    </li>
  );
}

export default Dropdown;
