import React, { useState, useEffect } from 'react';
import './Zamdekan.css'; // Stil faylini qo'shish

const Zamdekan = () => {
  const [schedule, setSchedule] = useState([]);
  const [form, setForm] = useState({
    group: '',
    room: '',
    teacher: '',
    cameraLink: '',
  });
  const [currentView, setCurrentView] = useState(null);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSchedule = [...schedule, form];
    setSchedule(updatedSchedule);
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    setForm({ group: '', room: '', teacher: '', cameraLink: '' });
  };

  const handleViewCamera = (item) => {
    setCurrentView(item);
  };

  const handlePlayVideo = () => {
    const videoElement = document.getElementById('videoPlayer');
    if (videoElement) {
      videoElement.currentTime = 0; // Videoni boshidan boshlash
      videoElement.play().catch((error) => {
        console.error('Video boshlashda xatolik:', error);
        alert('Videoni boshlashda muammo yuz berdi.');
      });
    }
  };

  const isYouTubeLink = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const handlePlayYouTube = () => {
    const iframeElement = document.getElementById('youtubePlayer');
    if (iframeElement) {
      iframeElement.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  };

  if (currentView) {
    return (
      <div className="camera-view-container">
        <h2>O'qituvchi: {currentView.teacher}</h2>
        <h3>Xona: {currentView.room}</h3>
        <div className="media-player">
          {isYouTubeLink(currentView.cameraLink) ? (
            <>
              <iframe
                id="youtubePlayer"
                width="600"
                height="400"
                src={`https://www.youtube.com/embed/${
                  currentView.cameraLink.split('v=')[1] || currentView.cameraLink.split('/').pop()
                }?enablejsapi=1`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="play-button" onClick={handlePlayYouTube}>
                Play
              </button>
            </>
          ) : (
            <>
              <video id="videoPlayer" width="600" controls>
                <source src={currentView.cameraLink} type="video/mp4" />
                Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
              </video>
              <button className="play-button" onClick={handlePlayVideo}>
                Play
              </button>
            </>
          )}
        </div>
        <button className="back-button" onClick={() => setCurrentView(null)}>
          Orqaga
        </button>
      </div>
    );
  }

  return (
    <div className="zamdekan-container">
      <h2 className="zamdekan-title">Zamdekan Dashboard</h2>
      <form className="zamdekan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Group"
            value={form.group}
            onChange={(e) => setForm({ ...form, group: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Room"
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Teacher"
            value={form.teacher}
            onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Camera Link"
            value={form.cameraLink}
            onChange={(e) => setForm({ ...form, cameraLink: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-btn">Add Schedule</button>
      </form>
      <div className="cards-container">
        {schedule.map((item, index) => (
          <div className="card" key={index}>
            <p><strong>Guruh nomi:</strong> {item.group}</p>
            <p><strong>Xona:</strong> {item.room}</p>
            <p><strong>O'qituvchi:</strong> {item.teacher}</p>
            <button
              className="camera-link"
              onClick={() => handleViewCamera(item)}
            >
              Kamerani ko'rish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zamdekan;
