import React from 'react';
import AirlineLogo from './AirlineLogo';
import FlightTimeDisplay from './FlightTimeDisplay';
import FlightProgressBar from './FlightProgessBar';

function FlightCard({ flight, onFlightClick, type }) {
  const isArrival = type === 'arrival';

  return (
    <li 
      className="py-3 cursor-pointer"
      onClick={() => onFlightClick(flight)}
    >
      <div className="flex justify-between items-center hover:bg-slate-700/50 -mx-4 px-4 rounded-md py-2 transition-colors">
        <div className="flex items-center space-x-4">
          <AirlineLogo airlineName={flight.airline.name} />
          <div>
            <p className="font-mono text-slate-100 font-semibold">
              {flight.airline.name} {flight.flight.iata}
            </p>
            <p className="text-sm text-slate-400">
              {isArrival ? `From: ${flight.departure.airport}` : `To: ${flight.arrival.airport}`}
            </p>
          </div>
        </div>
        <FlightTimeDisplay 
          scheduled={isArrival ? flight.arrival.scheduled : flight.departure.scheduled}
          estimated={isArrival ? flight.arrival.estimated : flight.departure.estimated}
          actual={isArrival ? flight.arrival.actual : flight.departure.actual}
          type={type}
        />
      </div>
      <FlightProgressBar 
        departureTime={flight.departure.scheduled}
        arrivalTime={flight.arrival.scheduled}
        status={flight.flight_status}
      />
    </li>
  );
}

export default FlightCard;
