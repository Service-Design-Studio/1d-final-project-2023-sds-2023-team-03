import React, { useState } from 'react';
import axios from 'axios';
import { VscMenu } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import {BiDollarCircle} from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { BiAbacus } from 'react-icons/bi';
import {BiMask} from 'react-icons/bi'
import Dropdown from './competitor';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './Sidebar.css';
import { RefreshButton } from "@refinedev/mantine";
import { Modal, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { useSpring, animated,config } from 'react-spring';




function Sidebar({handleClearState}) {
  const [isExpanded, setExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();



  const logoutButtonAnimation = useSpring({
    opacity: isExpanded ? 1 : 0,
    scale: isExpanded ? 1 : 0,
  });

  const reactIconAnimation = useSpring({
    opacity: isExpanded ? 1 : 0,
    scale: isExpanded ? 1 : 0,
  });

  const sidebarAnimation = useSpring({
    width: isExpanded ? 165 : 50,
      config: config.stiff,

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
    // Add your logic for Home button click
    handleClearState();
    navigate('/login');  
    setLogoutModalOpen(false);
    setExpanded(false);
  };
  
  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
    navigate('/');
  };

  const handleInternalClick = () => {
    console.log('Internal button clicked');
    navigate('/merchandising');
  };

  const handleExternalClick = () => {
    console.log('External button clicked');
    navigate('/sales');
  };


  const options = ['Adidas', 'Nike', 'Under Armour', 'Skechers', 'Overall']; // Options list for dropdown box
  // State to control the visibility of the logout confirmation modal

  return (
    <div
      className={`sidebar w-60 bg-gray-900 text-white transition-all duration-300 overflow-hidden ${
        isExpanded ? 'expanded' : ''
      }`}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        zIndex: 999, // Set a higher value for the z-index
      }}
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
              <span className="sbtext">Sales</span>
            </div>
            <div onClick={handleInternalClick} className={`sblogo sblogo-expanded`}>
              <BiAbacus className="sbicon" />
              <span className="sbtext">Merchandising</span>
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
        <animated.div className="logout-button" style={logoutButtonAnimation}>
        <motion.button
          onClick={handleLogout}
          style={{ transform: logoutButtonAnimation.transform }}
          className="logout-button-inner"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Logout
        </motion.button>
      </animated.div>
      )}
      <div className="react-icon">
        <VscMenu />
      </div>

      <Modal
        opened={isLogoutModalOpen}
        onClose={handleCancelLogout}
        title="PUMA SEA E-Commerce Analytics"
        size="m"
        overlayClassName="modal-overlay"
        xOffset="5wh"
        yOffset="20vh"
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
