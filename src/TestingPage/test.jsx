import React, { useState, useEffect } from 'react';
import './test.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const EMOJIS = ['😊', '😄', '😁', '🙂', '😃','🥺'];

export function Test() {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setEmojiIndex(prev => (prev + 1) % EMOJIS.length);
        setFade(true);
      }, 250);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate('/signin'); // ← replace with your router call
    t('Redirecting to login...');
  };

  return (
    <div className="lo-wrap">
      <div className="lo-card">
        <div
          className="lo-emoji"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {EMOJIS[emojiIndex]}
        </div>

        <h1 className="lo-title">You have successfully logged out</h1>
        <p className="lo-subtitle">Visit again soon!</p>

        <button className="lo-btn" onClick={handleLogin}>
          <span>Click here to login again</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}