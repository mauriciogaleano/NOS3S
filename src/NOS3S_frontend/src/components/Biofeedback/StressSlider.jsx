import React, { useState, useEffect } from 'react';
import './StressSlider.css';

export default function StressSlider({
  question,
  descriptors,
  onComplete,
  currentQuestion,
  totalQuestions
}) {
  const [value, setValue] = useState(3);
  const [bgColor, setBgColor] = useState('rgb(100, 150, 255)');

  useEffect(() => {
    const red = Math.floor(255 - value * 40);
    const green = Math.floor(100 + value * 20);
    const blue = Math.floor(150 + value * 20);
    const color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    setBgColor(color);
  }, [value]);

  return (
    <div
      className="slider-screen"
      style={{
        backgroundColor: bgColor,
        minHeight: '100vh',
        padding: '2rem',
        transition: 'background-color 0.5s ease'
      }}
    >
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}
      >
        Question {currentQuestion} of {totalQuestions}
      </div>

      <h2 style={{ color: 'white', textAlign: 'center' }}>{question}</h2>

      <div style={{ width: '80%', maxWidth: '400px', margin: '2rem auto' }}>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={e => setValue(parseInt(e.target.value, 10))}
          style={{
            width: '100%',
            height: '40px',
            WebkitAppearance: 'none',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '20px',
            outline: 'none'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <span>{descriptors[0]}</span>
          <span>{descriptors[4]}</span>
        </div>
      </div>

      <button
        onClick={() => onComplete(value)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid white',
          color: 'white',
          padding: '12px 30px',
          borderRadius: '30px',
          margin: '2rem auto',
          display: 'block',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        {currentQuestion < totalQuestions ? 'Next Question' : 'See Results'}
      </button>
    </div>
  );
}
