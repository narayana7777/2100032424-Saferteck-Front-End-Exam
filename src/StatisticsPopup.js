// StatisticsPopup.js

import React from 'react';

const StatisticsPopup = ({ onClose, totalStudents, passedStudents, averageGrade, maxGrade, minGrade }) => {
  return (
    <div className="statistics-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <h2>Statistics</h2>
        <p>Total Students: {totalStudents}</p>
        <p>Passed Students: {passedStudents}</p>
        <p>Average Grade: {averageGrade.toFixed(2)}</p>
        <p>Max Grade: {maxGrade}</p>
        <p>Min Grade: {minGrade}</p>
      </div>
    </div>
  );
};

export default StatisticsPopup;
