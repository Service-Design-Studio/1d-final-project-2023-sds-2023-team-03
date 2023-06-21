import React, { useState } from 'react';
import { VscMenu } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import {BiDollarCircle} from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { BiAbacus } from 'react-icons/bi';
import {BiMask} from 'react-icons/bi'
import Dropdown from './Competitor';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './Sidebar.css';
import { Modal, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';




function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const sidebarAnimation = useSpring({
    width: isExpanded ? 250 : 50,
  });

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
            <animated.div style={sidebarAnimation}>

      <ul className={`${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
          <>
             <div className={`sblogo sblogo-expanded ${isExpanded ? 'visible' : ''}`} onClick={handleHomeClick}>
              <AiOutlineHome className="sbicon" />
            <span className="sbtext">Home</span>
            </div>
            <div onClick={handleExternalClick} className={`sblogo sblogo-expanded`}>
              <BiDollarCircle className="sbicon" />
              <span className="sbtext">External</span>
            </div>
            <div onClick={handleInternalClick} className={`sblogo sblogo-expanded`}>
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

      {!isExpanded && (
      <div className=" sblogo-minimized">
      <div>
        <AiOutlineHome className="sbicon" />
      </div>
      <div>
        <BiDollarCircle className="sbicon" />
      </div>
      <div>
        <BiAbacus className="sbicon" />
      </div>
      <div>
        <BiMask className="sbicon" />
      </div>
    </div>
      )}
            </animated.div>

      {isExpanded && (
        <div className="logout-button">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="logout-button-inner"
        >
          Logout
        </motion.button>
      </div>
      )}
      <div className="react-icon">
        <VscMenu />
      </div>
    
      <Modal
        opened={isLogoutModalOpen}
        onClose={handleCancelLogout}
        title="PUMA SEA E-Commerce Analytics"
        size="sm"
        overlayClassName="modal-overlay"
      >
       <div className="modal-content">
  <h2 className="modal-title">Logout Confirmation</h2>
  <GrLogout className="modal-icon" />
  <p className="modal-message">Are you sure you want to logout?</p>
  <div className="modal-buttons">
  <motion.button
              className="modal-confirm"
              onClick={handleConfirmLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Confirm
            </motion.button>
            <motion.button
              className="modal-cancel"
              onClick={handleCancelLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Cancel
            </motion.button>  </div>
</div>
      </Modal>



</div>
  );
}

export default Sidebar;
