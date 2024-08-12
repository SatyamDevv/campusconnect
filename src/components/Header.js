import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-primary text-white p-3 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img src="/api/placeholder/32/32" alt="University Logo" className="me-2" />
        <h1 className="h5 mb-0">Campus Connet</h1>
      </div>
      <div className="d-flex align-items-center">
        <FaBell className="me-3" size={24} />
        <div className="d-flex align-items-center">
          <img src="/api/placeholder/32/32" alt="User" className="rounded-circle me-2" style={{ width: 32, height: 32 }} />
          <FaUser size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;