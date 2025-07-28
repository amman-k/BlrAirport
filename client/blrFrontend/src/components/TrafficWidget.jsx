import React, { useState, useEffect } from 'react';
// We don't need axios for this mock version

function TrafficWidget() {
  const [travelTime, setTravelTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setTravelTime('3 hours 15 mins'); // Set a realistic mock travel time
      setIsLoading(false);
    }, 1000); // Wait for 1 second to mimic loading

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 my-4 border border-slate-700">
      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2">Live Traffic to BLR</h3>
      <div className="flex items-center space-x-4">
        <span className="text-3xl">⏱️</span>
        <div>
          <p className="text-sm text-slate-400">Current travel time from Vellore:</p>
          {isLoading ? (
            <p className="text-lg font-semibold text-slate-200">Loading...</p>
          ) : (
            <p className="text-lg font-semibold text-sky-400">{travelTime}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrafficWidget;