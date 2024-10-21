import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import christlogo from '../assets/christlogo.jpg';

const Header = ({ userData }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <header className="bg-primary text-white p-3 d-flex align-items-center justify-content-between position-relative">
      <div className="d-flex align-items-center">
        <img src={christlogo} alt="University Logo" className="me-2" width={50} />
        <h1 className="h5 mb-0">Campus Assist</h1>
      </div>
      <div className="d-flex align-items-center">
        <FaBell className="me-3" size={24} />
        <div className="d-flex align-items-center position-relative">
          <FaUser size={24} onClick={toggleUserDetails} style={{ cursor: 'pointer' }} />
          {showUserDetails && userData && (
            <div className="position-absolute bg-white text-dark p-3 rounded shadow" style={{ top: '100%', right: 0, zIndex: 1000, minWidth: '200px' }}>
              <h6>User Details</h6>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Registration Number:</strong> {userData.regNumber}</p>
              <p><strong>Course:</strong> {userData.course}</p>
              <p><strong>Section:</strong> {userData.section}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;