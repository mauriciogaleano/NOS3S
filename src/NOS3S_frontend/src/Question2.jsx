import React from 'react';

export function Question2({ onAnswer, onBack }) {
  const [rating, setRating] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating !== null) onAnswer(rating);
  };

  return (
    <div className="page">
      <h2>Question 2/5</h2>
      <p>How do you feel about yourself right now?</p>
      
      <form onSubmit={handleSubmit}>
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num}>
            <input
              type="radio"
              name="rating"
              checked={rating === num}
              onChange={() => setRating(num)}
            />
            {num} (1 = Very Poor, 5 = Excellent)
          </label>
        ))}
        
        <div className="buttons">
          <button type="button" onClick={onBack}>Back</button>
          <button type="submit" disabled={rating === null}>Next</button>
        </div>
      </form>
    </div>
  );
}