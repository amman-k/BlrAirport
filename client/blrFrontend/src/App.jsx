// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TransportWidget from './components/TransportWidget';
import TrafficWidget from './components/TrafficWidget';
import FlightDetailModal from './components/FlightDetailModal';

function App() {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const fetchAllFlightData = async () => {
      try {
        const [arrivalsRes, departuresRes] = await Promise.all([
          axios.get('/api/flights/arrivals'),
          axios.get('/api/flights/departures')
        ]);
        if (Array.isArray(arrivalsRes.data)) setArrivals(arrivalsRes.data);
        if (Array.isArray(departuresRes.data)) setDepartures(departuresRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch flight data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllFlightData();
  }, []);

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen font-sans">
      <Navbar />

      <main className="container mx-auto p-4 md:p-8">
        <section id="ground-transport" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrafficWidget />
            <TransportWidget />
          </div>
        </section>

        <section id="flight-hub">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Arrivals Card */}
            <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Arrivals 🛬</h2>
              {/* ... loading and error states */}
              {arrivals.length > 0 ? (
                <ul className="divide-y divide-slate-700">
                  {arrivals.map((flight, index) => (
                    <li key={`arr-${index}`} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-mono text-slate-100 font-semibold">
                          {flight.airline.name} {flight.flight.iata}
                        </p>
                        <p className="text-sm text-slate-400">From: {flight.departure.airport}</p>
                      </div>
                      <span className="text-xs md:text-sm font-medium bg-sky-900 text-sky-300 px-2 py-1 rounded-full whitespace-nowrap">
                        {flight.flight_status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (!loading && <p className="text-slate-400">No arrival data available.</p>)}
            </div>

            {/* Departures Card */}
            <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Departures 🛫</h2>
              {/* ... loading and error states */}
              {departures.length > 0 ? (
                <ul className="divide-y divide-slate-700">
                  {departures.map((flight, index) => (
                    <li key={`dep-${index}`} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-mono text-slate-100 font-semibold">
                          {flight.airline.name} {flight.flight.iata}
                        </p>
                        <p className="text-sm text-slate-400">To: {flight.arrival.airport}</p>
                      </div>
                      <span className="text-xs md:text-sm font-medium bg-green-900 text-green-300 px-2 py-1 rounded-full whitespace-nowrap">
                        {flight.flight_status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (!loading && <p className="text-slate-400">No departure data available.</p>)}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;