import React, { useState, useEffect } from 'react';
import './Talaba.css'; // Stil faylini qo'shish

const Talaba = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Retrieve schedule data from localStorage
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  return (
    <div className="talaba-container">
      <h2 className="talaba-title">Talaba Dashboard</h2>
      <table className="talaba-table">
        <thead>
          <tr>
            <th>Group</th>
            <th>Room</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.room}</td>
              <td>{item.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Talaba;
