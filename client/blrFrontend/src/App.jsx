// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TransportWidget from './components/TransportWidget';
import TrafficWidget from './components/TrafficWidget';
import FlightDetailModal from './components/FlightDetailModal';
import Directory from './components/Directory';
import Footer from './components/Footer';
import FlightCard from './components/FlightCard';
import FlightListSkeleton from './components/FlightListSkeleton';
import WeatherForecast from './components/WeatherForecast';

function App() {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllFlightData = async () => {
      if (!loading) { 
        console.log('Auto-refreshing flight data...');
      }
      try {
        const [arrivalsRes, departuresRes] = await Promise.all([
          axios.get('/api/flights/arrivals'),
          axios.get('/api/flights/departures')
        ]);
        if (Array.isArray(arrivalsRes.data)) setArrivals(arrivalsRes.data);
        if (Array.isArray(departuresRes.data)) setDepartures(departuresRes.data);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError('Failed to fetch flight data. You may have hit the API rate limit.');
        console.error(err);
      } finally {

        if (loading) setLoading(false);
      }
    };

    fetchAllFlightData();
    const intervalId = setInterval(fetchAllFlightData, 900000);

    return () => clearInterval(intervalId);
  }, []);

  
  const filteredArrivals = useMemo(() => {
    if (!searchTerm) return arrivals;
    return arrivals.filter(flight => 
      (flight.airline.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (flight.flight.iata?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (flight.departure.airport?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [arrivals, searchTerm]);

  const filteredDepartures = useMemo(() => {
    if (!searchTerm) return departures;
    return departures.filter(flight => 
      (flight.airline.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (flight.flight.iata?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (flight.arrival.airport?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [departures, searchTerm]);

  // Handlers for opening and closing the modal
  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

  // Helper to format the last updated time
  const formatLastUpdated = (date) => {
    if (!date) return '';
    return `Last updated: ${date.toLocaleTimeString()}`;
  }

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <section id="ground-transport" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrafficWidget />
            <TransportWidget />
          </div>
        </section>

        <section id="weather-forecast" className="mb-8">
          <WeatherForecast />
        </section>

        <section id="search-section" className="mb-8">
          <input 
            type="text"
            placeholder="Search by airline, flight no., or city..."
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </section>

        <section id="flight-hub" className="mb-8">
          <div className="text-right text-xs text-slate-500 mb-2">
            {formatLastUpdated(lastUpdated)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arrivals Card */}
            <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Arrivals 🛬</h2>
              {loading ? <FlightListSkeleton /> : (
                error ? <p className="text-red-400 font-semibold">{error}</p> : (
                  filteredArrivals.length > 0 ? (
                    <ul className="divide-y divide-slate-700">
                      {filteredArrivals.map((flight, index) => (
                        <FlightCard 
                          key={`arr-${index}`}
                          flight={flight}
                          onFlightClick={handleFlightClick}
                          type="arrival"
                        />
                      ))}
                    </ul>
                  ) : (<p className="text-slate-400">No matching flights found.</p>)
                )
              )}
            </div>
            {/* Departures Card */}
            <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Departures 🛫</h2>
              {loading ? <FlightListSkeleton /> : (
                error ? <p className="text-red-400 font-semibold">{error}</p> : (
                  filteredDepartures.length > 0 ? (
                    <ul className="divide-y divide-slate-700">
                      {filteredDepartures.map((flight, index) => (
                         <FlightCard 
                          key={`dep-${index}`}
                          flight={flight}
                          onFlightClick={handleFlightClick}
                          type="departure"
                        />
                      ))}
                    </ul>
                  ) : (<p className="text-slate-400">No matching flights found.</p>)
                )
              )}
            </div>
          </div>
        </section>

        <section id="directory">
          <Directory />
        </section>
      </main>
      <FlightDetailModal flight={selectedFlight} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
}

export default App;
