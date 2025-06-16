import React from 'react';
import './StressSlider.css';

export default function Question1({ value, onNext }) {
  return (
    <div className="stress-slider-container">
      <h2>Environmental Stress</h2>
      <p>How chaotic or orderly does your environment feel?</p>
      
      <div className="slider-labels">
        <span>Complete chaos</span>
        <input 
          type="range"
          min="1"
          max="5"
          value={value || 3}
          onChange={(e) => onNext(parseInt(e.target.value))}
          className="stress-slider"
        />
        <span>Perfectly orderly</span>
      </div>
      <button onClick={() => onNext(value)} className="biofeedback-button">
        Continue
      </button>
    </div>
  );
}
