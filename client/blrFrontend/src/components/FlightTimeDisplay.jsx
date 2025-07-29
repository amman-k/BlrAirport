import React from 'react';
import { format } from 'date-fns';

function FlightTimeDisplay({ scheduled, estimated, actual, type }) {
  const displayTime = actual || estimated || scheduled;

  let timeLabel = 'Scheduled';
  if (actual) {
    timeLabel = type === 'arrival' ? 'Landed' : 'Departed';
  } else if (estimated) {
    timeLabel = 'Estimated';
  }

  const formattedTime = displayTime ? format(new Date(displayTime), 'hh:mm a') : 'N/A';

  return (
    <div className="text-right">
      <p className="font-mono text-slate-100 font-semibold">{formattedTime}</p>
      <p className="text-xs text-slate-400">{timeLabel}</p>
    </div>
  );
}

export default FlightTimeDisplay;
