import React from 'react';
import './StressSlider.css';

export default function Question2({ value, onNext }) {
  return (
    <div className="stress-slider-container">
      <h2>Body Awareness</h2>
      <p>How connected do you feel to your body?</p>
      
      <div className="slider-labels">
        <span>Completely numb</span>
        <input 
          type="range"
          min="1"
          max="5"
          value={value || 3}
          onChange={(e) => onNext(parseInt(e.target.value))}
          className="stress-slider"
        />
        <span>Highly attuned</span>
      </div>
      <button onClick={() => onNext(value)} className="biofeedback-button">
        Continue
      </button>
    </div>
  );
}
