import { NOS3S_backend } from '../../declarations/NOS3S_backend';
import { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState({ 
    message: 'Connecting...', 
    isConnected: false, 
    points: null 
  });

  const testConnection = async () => {
    console.log(NOS3S_backend);
    try {
      console.log("Backend instance:", NOS3S_backend);
      
      if (!NOS3S_backend) {
        throw new Error("NOS3S_backend canister not initialized");
      }

      // Test API methods
      await NOS3S_backend.register("default");
      const points = await NOS3S_backend.getPoints();
      const user = await NOS3S_backend.getUser();

      setStatus({
        message: '✅ Connected successfully!',
        isConnected: true,
        points
      });
    } catch (error) {
      console.error("Connection error:", error);
      setStatus({
        message: `❌ Failed: ${error.message}`,
        isConnected: false,
        points: null
      });
    }
  };

  // Auto-test on mount
  useEffect(() => { testConnection(); }, []);

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'sans-serif'
    }}>
      <h1>NOS3S Connection Test</h1>
      <div style={{
        padding: '15px',
        margin: '20px 0',
        background: status.isConnected ? '#e8f5e9' : '#ffebee',
        borderRadius: '8px'
      }}>
        <p>{status.message}</p>
        {status.points !== null && (
          <p>Points: <strong>{status.points}</strong></p>
        )}
      </div>
      <button
        onClick={testConnection}
        style={{
          padding: '10px 20px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Again
      </button>
    </div>
  );
}