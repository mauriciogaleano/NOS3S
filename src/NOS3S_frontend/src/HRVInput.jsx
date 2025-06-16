import React from 'react';

export function HRVInput({ onNext }) {
  const [hrv, setHrv] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hrv) onNext(hrv);
  };

  return (
    <div className="page">
      <h2>Enter Your HRV</h2>
      <form onSubmit={handleSubmit}>
        <label>
          HRV (in milliseconds):
          <input
            type="number"
            value={hrv}
            onChange={(e) => setHrv(e.target.value)}
            required
          />
        </label>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}