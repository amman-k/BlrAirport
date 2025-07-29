import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import TransportWidget from "./components/TransportWidget";
import TrafficWidget from "./components/TrafficWidget";
import FlightDetailModal from "./components/FlightDetailModal";
import { useMemo } from "react";
import AirlineLogo from './components/AirlineLogo';
import Directory from './components/Directory';

function App() {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated,setLastUpdated]=useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllFlightData = async () => {
      try {
        const [arrivalsRes, departuresRes] = await Promise.all([
          axios.get("/api/flights/arrivals"),
          axios.get("/api/flights/departures"),
        ]);

        if (Array.isArray(arrivalsRes.data)) {
          setArrivals(arrivalsRes.data);
        }
        if (Array.isArray(departuresRes.data)) {
          setDepartures(departuresRes.data);
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch flight data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFlightData();
    const intervalId=setInterval(fetchAllFlightData,900000);
    return ()=>clearInterval(intervalId);
  }, []);

  const filteredArrivals = useMemo(() => {
    if (!searchTerm) return arrivals;
    return arrivals.filter(
      (flight) =>
        flight.airline.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.flight.iata?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.departure.airport
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [arrivals, searchTerm]);

  const filteredDepartures = useMemo(() => {
    if (!searchTerm) return departures;
    return departures.filter(
      (flight) =>
        flight.airline.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.flight.iata?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.departure.airport
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [departures, searchTerm]);

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

  const formatLastUpdated=(date)=>{
    if(!date) return ''
    return `Last updated: ${date.toLocaleTimeString()}`;
  }

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
              {loading && <p className="text-slate-400">Loading...</p>}
              {error && <p className="text-red-400 font-semibold">{error}</p>}
              {filteredArrivals.length > 0 ? (
                <ul className="divide-y divide-slate-700">
                  {filteredArrivals.map((flight, index) => (
                    <li 
                      key={`arr-${index}`} 
                      className="py-3 flex justify-between items-center cursor-pointer hover:bg-slate-700/50 -mx-4 px-4 rounded-md transition-colors"
                      onClick={() => handleFlightClick(flight)}
                    >
                      <div className="flex items-center space-x-4">
                        <AirlineLogo airlineName={flight.airline.name} />
                        <div>
                          <p className="font-mono text-slate-100 font-semibold">
                            {flight.airline.name} {flight.flight.iata}
                          </p>
                          <p className="text-sm text-slate-400">From: {flight.departure.airport}</p>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm font-medium bg-sky-900 text-sky-300 px-2 py-1 rounded-full whitespace-nowrap">
                        {flight.flight_status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (!loading && <p className="text-slate-400">No matching flights found.</p>)}
            </div>
            {/* Departures Card */}
            <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Departures 🛫</h2>
              {loading && <p className="text-slate-400">Loading...</p>}
              {error && <p className="text-red-400 font-semibold">{error}</p>}
              {filteredDepartures.length > 0 ? (
                <ul className="divide-y divide-slate-700">
                  {filteredDepartures.map((flight, index) => (
                    <li 
                      key={`dep-${index}`} 
                      className="py-3 flex justify-between items-center cursor-pointer hover:bg-slate-700/50 -mx-4 px-4 rounded-md transition-colors"
                      onClick={() => handleFlightClick(flight)}
                    >
                      <div className="flex items-center space-x-4">
                        <AirlineLogo airlineName={flight.airline.name} />
                        <div>
                          <p className="font-mono text-slate-100 font-semibold">
                            {flight.airline.name} {flight.flight.iata}
                          </p>
                          <p className="text-sm text-slate-400">To: {flight.arrival.airport}</p>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm font-medium bg-green-900 text-green-300 px-2 py-1 rounded-full whitespace-nowrap">
                        {flight.flight_status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (!loading && <p className="text-slate-400">No matching flights found.</p>)}
            </div>
          </div>
        </section>

        <section id="directory">
          <Directory />
        </section>
      </main>
      <FlightDetailModal flight={selectedFlight} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
