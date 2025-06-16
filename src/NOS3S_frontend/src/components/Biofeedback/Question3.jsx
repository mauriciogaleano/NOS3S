import React from 'react';
import './StressSlider.css';

export default function Question3({ value, onNext }) {
  return (
    <div className="stress-slider-container">
      <h2>Cognitive Load</h2>
      <p>How scattered or focused are your thoughts?</p>
      
      <div className="slider-labels">
        <span>Racing thoughts</span>
        <input 
          type="range"
          min="1"
          max="5"
          value={value || 3}
          onChange={(e) => onNext(parseInt(e.target.value))}
          className="stress-slider"
        />
        <span>Laser focus</span>
      </div>
      <button onClick={() => onNext(value)} className="biofeedback-button">
        Continue
      </button>
    </div>
  );
}

