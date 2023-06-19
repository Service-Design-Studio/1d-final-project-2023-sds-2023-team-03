import React, { useState } from 'react';
import { VscMenu } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import {BiDollarCircle} from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { BiAbacus } from 'react-icons/bi';
import Dropdown from './Competitor';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './Sidebar.css';
import Modal from 'react-modal';


function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);


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
    setLogoutModalOpen(true);
  };
  
  const handleConfirmLogout = () => {
    // Perform the logout action here
  };
  
  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
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
  // State to control the visibility of the logout confirmation modal

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
            <div onClick={handleHomeClick} className="sblogo">
              <AiOutlineHome className="sbicon" />
              <span className="sbtext">Home</span>
            </div>
            <div onClick={handleExternalClick} className="sblogo">
              <BiDollarCircle className="sbicon" />
              <span className="sbtext">External</span>
            </div>
            <div onClick={handleInternalClick} className="sblogo">
              <BiAbacus className="sbicon" />
              <span className="sbtext">Internal</span>
            </div>
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
    
      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={handleCancelLogout}
        contentLabel="Logout Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <GrLogout className="modal-icon" />
          <h2 className="modal-title">Logout Confirmation</h2>
          <p className="modal-message">Are you sure you want to logout?</p>
          <div className="modal-buttons">
            <button className="modal-confirm" onClick={handleConfirmLogout}>Confirm</button>
            <button className="modal-cancel" onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      </Modal>



</div>
  );
}

export default Sidebar;
