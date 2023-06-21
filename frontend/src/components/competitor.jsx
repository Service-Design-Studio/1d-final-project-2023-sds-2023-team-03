import React, { useState, useEffect } from 'react';
import { BiMask } from 'react-icons/bi';
import 'tailwindcss/tailwind.css';
import { Routes, Route,useNavigate } from 'react-router-dom'



function Dropdown({ isExpanded, isDropdownOpen, setDropdownOpen, options }) {
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const handleOptionClick = (route) => {
    navigate(`/competitors/${route}`);
    console.log('Competitors button clicked');

  };

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
            <div onClick={() => handleOptionClick(option)}>{option}</div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Dropdown;
