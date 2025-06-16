import React, { useState } from 'react';
import './StressSlider.css';

export default function StressSlider({ question, descriptors, onValueChange, isLastStep }) {
  const [value, setValue] = useState(3);
  
  const bgColors = [
    '#ff3d3d', '#ff6b6b', '#a5d8ff', '#74c0fc', '#4dabf7'
  ];

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    document.querySelector('.app').style.background = bgColors[newValue - 1];
  };

  return (
    <div className="stress-slider-container">
      <h3>{question}</h3>
      <p className="stress-descriptor">{descriptors[value - 1]}</p>
      
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={handleChange}
        onInput={handleChange}
        className="stress-slider"
      />

      <div className="slider-labels">
        <span>😰 High Stress</span>
        <span>😌 Optimal</span>
      </div>

      <button 
        onClick={() => onValueChange(value)}
        className="submit-button"
      >
        {isLastStep ? 'Complete Assessment' : 'Next Question'}
      </button>
    </div>
  );
}
