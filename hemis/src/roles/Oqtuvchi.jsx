import React, { useState, useEffect } from 'react';
import './Oqtuvchi.css'; // Stil faylini qo'shish

const Oqtuvchi = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Retrieve schedule data from localStorage
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      const parsedSchedule = JSON.parse(savedSchedule);
      const filteredSchedule = parsedSchedule.map(({ group, room }) => ({ group, room }));
      setSchedule(filteredSchedule);
    }
  }, []);

  return (
    <div className="oqtuvchi-container">
      <h2 className="oqtuvchi-title">O'qituvchi Dashboard</h2>
      <div className="oqtuvchi-cards">
        {schedule.map((item, index) => (
          <div className="oqtuvchi-card" key={index}>
            <h3>{item.group}</h3>
            <p><strong>Xona:</strong> {item.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Oqtuvchi;
