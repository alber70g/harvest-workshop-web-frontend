import React from 'react';

export const Timer: React.FC<{ time: Date; }> = ({ time }) => {
  return <div>{time.toLocaleTimeString()}</div>;
};
