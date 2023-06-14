import React from 'react';

function Dropdown({ isExpanded, isDropdownOpen, setDropdownOpen, options }) {
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent elements
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li>
      {isExpanded && (
        <li onClick={toggleDropdown}>
          Competitor
          <span>{isDropdownOpen ? '▲' : '▼'}</span>
        </li>
      )}
      {isDropdownOpen && (
        <ul className="dropdown">
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Dropdown;
