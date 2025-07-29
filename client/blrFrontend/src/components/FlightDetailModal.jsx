import React from 'react';
import { format } from 'date-fns';
import FlightStatus from './FlightStatus';
import LiveFlightMap from './LiveFlightMap';

const formatDetailTime = (time) => {
  return time ? format(new Date(time), 'hh:mm a, MMM dd') : 'N/A';
};

function FlightDetailModal({ flight, onClose }) {
  if (!flight) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg p-6 w-full max-w-lg border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{flight.airline.name} {flight.flight.iata}</h3>
            <p className="text-sm text-slate-400">{flight.aircraft?.icao || 'Aircraft info not available'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        <div className="mb-4">
          <FlightStatus status={flight.flight_status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
          {/* Departure Info */}
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-slate-100 mb-2">Departure</h4>
            <p><strong>Location:</strong> {flight.departure.airport} ({flight.departure.iata})</p>
            <p><strong>Terminal:</strong> {flight.departure.terminal || 'TBD'}</p>
            <p><strong>Gate:</strong> {flight.departure.gate || 'TBD'}</p>
            <hr className="border-slate-600 my-2"/>
            <p><strong>Scheduled:</strong> {formatDetailTime(flight.departure.scheduled)}</p>
            <p><strong>Actual:</strong> {formatDetailTime(flight.departure.actual)}</p>
          </div>

          {/* Arrival Info */}
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-slate-100 mb-2">Arrival</h4>
            <p><strong>Location:</strong> {flight.arrival.airport} ({flight.arrival.iata})</p>
            <p><strong>Terminal:</strong> {flight.arrival.terminal || 'TBD'}</p>
            <p><strong>Baggage:</strong> {flight.arrival.baggage || 'TBD'}</p>
            <hr className="border-slate-600 my-2"/>
            <p><strong>Scheduled:</strong> {formatDetailTime(flight.arrival.scheduled)}</p>
            <p><strong>Actual:</strong> {formatDetailTime(flight.arrival.actual)}</p>
          </div>
        </div>

        {/* Conditionally render the map for en-route flights */}
        {flight.flight_status === 'en-route' && flight.live && (
          <LiveFlightMap liveData={flight.live} />
        )}
      </div>
    </div>
  );
}

export default FlightDetailModal;
