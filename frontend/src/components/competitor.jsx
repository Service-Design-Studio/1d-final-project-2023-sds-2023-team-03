import React, { useState, useEffect } from 'react';
import { BiMask } from 'react-icons/bi';
import 'tailwindcss/tailwind.css';

function Dropdown({ isExpanded, isDropdownOpen, setDropdownOpen, options }) {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!isHovered && !isDropdownOpen) {
      setDropdownOpen(false);
    }
  }, [isHovered, isDropdownOpen]);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isExpanded && (
        <div className={`sblogo sblogo-expanded`} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <BiMask className="sbicon" />
          <span className="sbtext">Competitors</span>
        </div>
      )}
      {(isDropdownOpen || isHovered) && (
        <ul className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {options.map((option, index) => (
            <li key={index} className={option === 'Overall' ? 'overall-option' : ''}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Dropdown;
