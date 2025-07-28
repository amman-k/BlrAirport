import { useState, useEffect } from 'react';
import axios from 'axios';
import TransportWidget from './components/TransportWidget'

function App(){
  const [arrivals,setArrivals]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    const fetchArrivals = async ()=>{
      try {
        const response = await axios.get('/api/flights/arrivals');
        if (Array.isArray(response.data)) {
          setArrivals(response.data);
        } else {
          // If it's not an array, set arrivals to an empty array
          setArrivals([]);
          console.warn("API did not return an array:", response.data);
        }
      }catch(err){
        setError('failed to fetch data');
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    fetchArrivals();
  },[]);

  if (loading) {
    return <div>Loading flight data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <div className="bg-slate-900 text-slate-300 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          {/* On medium screens (md) and up, the text will be larger */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">BLR Airport Dashboard</h1>
          <p className="text-slate-400 mt-1">Your one-stop destination for travel information.</p>
        </header>

        <TransportWidget />

        <div className="mt-8 bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Live Arrivals 🛬</h2>
          {loading && <p className="text-slate-400">Loading flight data...</p>}
          {error && <p className="text-red-400 font-semibold">Error: {error}</p>}
          
          {arrivals.length > 0 ? (
            <ul className="divide-y divide-slate-700">
              {arrivals.map((flight, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-mono text-slate-100 font-semibold">{flight.flight.iata}</p>
                    <p className="text-sm text-slate-400">From: {flight.departure.airport}</p>
                  </div>
                  <span className="text-xs md:text-sm font-medium bg-sky-900 text-sky-300 px-2 py-1 rounded-full whitespace-nowrap">
                    {flight.flight_status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-slate-400">No arrival data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


