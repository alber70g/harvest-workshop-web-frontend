import { ApiResponse } from '@/pages/api/ApiResponse';
import React, { useState } from 'react';
import { Timer } from './Timer';

const ExampleApiComponent: React.FC = () => {
  const [response, setResponse] = useState<ApiResponse>();
  const [error, setError] = useState<string>();

  const handleStart = async () => {
    try {
      const res = await fetch('/api/start', { method: 'POST' });
      const data = (await res.json()) as ApiResponse;
      setResponse(data);
    } catch (error) {
      setError('Error: ' + (error as Error).message);
    }
  };

  const handleNow = async () => {
    try {
      const res = await fetch('/api/now');
      const data = (await res.json()) as ApiResponse;
      setResponse(data);
    } catch (error) {
      setError('Error: ' + (error as Error).message);
    }
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleNow}>Now</button>
      {error && <div>{error}</div>}
      {response?.status === 'stopped' && <div>Stopped</div>}
      {response?.status === 'started' && (
        <div>
          <div>Started</div>
          <div>Date {response.data[0].car.date}</div>
          <Timer time={new Date(response.time)} />
        </div>
      )}
    </div>
  );
};

export default ExampleApiComponent;
