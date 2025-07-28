import React from 'react';

function FlightDetailModal({ flight, onClose }) {
  if (!flight) return null;

  const isArrival = flight.departure.airport;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      {/* This is the modal content itself */}
      <div 
        className="bg-slate-800 rounded-lg p-6 w-11/12 max-w-md border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{flight.airline.name} {flight.flight.iata}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="space-y-2 text-slate-300">
          <p><strong>Status:</strong> <span className="text-sky-400">{flight.flight_status}</span></p>
          <p><strong>Aircraft:</strong> {flight.aircraft?.icao || 'N/A'}</p>
          {isArrival ? (
            <>
              <p><strong>From:</strong> {flight.departure.airport}</p>
              <p><strong>Terminal:</strong> {flight.arrival.terminal || 'TBD'}</p>
              <p><strong>Baggage Belt:</strong> {flight.arrival.baggage || 'TBD'}</p>
            </>
          ) : (
            <>
              <p><strong>To:</strong> {flight.arrival.airport}</p>
              <p><strong>Terminal:</strong> {flight.departure.terminal || 'TBD'}</p>
              <p><strong>Gate:</strong> {flight.departure.gate || 'TBD'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightDetailModal;