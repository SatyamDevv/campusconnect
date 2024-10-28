import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const quickAccessItems = [
  "Class Timetable", "Teacher Information", "PG and Hostel Details", 
  "Clubs and Societies", "Food Options", "Laundry Services", 
  "Gym Details", "Academic Office", "New Student Checklist", 
  "Examination Rules", "Sports Facilities", "Bus Services", 
  "Faculty Locations"
];

const QuickAccess = ({ onItemClick, showQuickAccess, setShowQuickAccess }) => {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="h6 mb-0">Quick Access</h2>
        <button 
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setShowQuickAccess(!showQuickAccess)}
        >
          {showQuickAccess ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {showQuickAccess && (
        <div className="d-flex flex-wrap gap-2">
          {quickAccessItems.map((item, index) => (
            <button 
              key={index} 
              className="btn btn-outline-primary btn-sm rounded-pill" 
              onClick={() => onItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickAccess;