// src/components/FlightProgressBar.jsx
import React from 'react';

function FlightProgressBar({ departureTime, arrivalTime, status }) {
  // Only show the progress bar for flights that are currently en-route
  if (status !== 'en-route') {
    return null;
  }

  // A function to calculate the flight progress percentage
  const calculateProgress = () => {
    const now = new Date().getTime();
    const departure = new Date(departureTime).getTime();
    const arrival = new Date(arrivalTime).getTime();

    // Avoid division by zero if times are the same
    if (arrival <= departure) return 100;

    const totalDuration = arrival - departure;
    const elapsedDuration = now - departure;

    // Calculate percentage and ensure it's between 0 and 100
    const progress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    
    return progress;
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
      <div 
        className="bg-sky-400 h-1.5 rounded-full" 
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default FlightProgressBar;
