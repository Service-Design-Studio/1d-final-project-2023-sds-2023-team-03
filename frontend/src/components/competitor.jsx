import React, { useState } from 'react';
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
          Competitors
        </li>
      )}
      {(isDropdownOpen || isHovered) && (
        <ul className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Dropdown;
