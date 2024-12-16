import React, { useState, useEffect } from 'react';
import './Rahbaryat.css'; // Stil faylini qo'shish

const Rahbaryat = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    // Retrieve schedule data from localStorage
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const filteredSchedule = schedule.filter(
    (item) => selectedGroup === '' || item.group === selectedGroup
  );

  return (
    <div className="rahbaryat-container">
      <h2 className="rahbaryat-title">Rahbariyat Dashboard</h2>
      <div className="filter-container">
        <label>Guruhni tanlang: </label>
        <select
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="rahbaryat-select"
        >
          <option value="">Barcha guruhlar</option>
          {schedule.map((item, index) => (
            <option key={index} value={item.group}>{item.group}</option>
          ))}
        </select>
      </div>
      <div className="cards-container">
        {filteredSchedule.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.group}</h3>
            <p>
              <strong>Xona:</strong> {item.room}
            </p>
            <p>
              <strong>O'qituvchi:</strong> {item.teacher}
            </p>
            <a
              href={item.cameraLink}
              target="_blank"
              rel="noopener noreferrer"
              className="camera-link"
            >
              Kamerani ko'rish
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rahbaryat;
