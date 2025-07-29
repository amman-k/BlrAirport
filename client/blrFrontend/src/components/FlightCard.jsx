import React from 'react';
import AirlineLogo from './AirlineLogo';
import FlightTimeDisplay from './FlightTimeDisplay';
import FlightProgressBar from './FlightProgessBar';

const cityMap = {
  'DEL': 'Delhi',
  'BOM': 'Mumbai',
  'MAA': 'Chennai',
  'CCU': 'Kolkata',
  'HYD': 'Hyderabad',
  'PNQ': 'Pune',
  'GOI': 'Goa',
  'ATL': 'Atlanta',
  'DXB': 'Dubai',
  'DFW': 'Dallas/Fort Worth',
  'LHR': 'London Heathrow',
  'HND': 'Tokyo Haneda',
  'DEN': 'Denver',
  'IST': 'Istanbul',
  'LAX': 'Los Angeles',
  'ORD': 'Chicago O\'Hare',
  'PEK': 'Beijing Capital',
  'SIN': 'Singapore Changi',
  'CAN': 'Guangzhou',
  'CDG': 'Paris Charles de Gaulle',
  'AMS': 'Amsterdam Schiphol',
  'ICN': 'Seoul Incheon',
  'BKK': 'Bangkok Suvarnabhumi',
  'PVG': 'Shanghai Pudong',
  'HKG': 'Hong Kong',
  'CGK': 'Jakarta Soekarno-Hatta',
  'JFK': 'New York JFK',
  'KUL': 'Kuala Lumpur',
  'DOH': 'Doha Hamad',
  'MNL': 'Manila',
  'SFO': 'San Francisco',
  'SEA': 'Seattle-Tacoma',
  'MIA': 'Miami',
  'FRA': 'Frankfurt',
  'CLT': 'Charlotte Douglas',
  'YYZ': 'Toronto Pearson',
  'SYD': 'Sydney',
  'BCN': 'Barcelona',
  'MAD': 'Madrid-Barajas',
  'GRU': 'São Paulo-Guarulhos',
  'MCO': 'Orlando',
  'PHX': 'Phoenix Sky Harbor',
  'LAS': 'Las Vegas',
  'MSP': 'Minneapolis-St. Paul',
  'EWR': 'Newark',
  'SZX': 'Shenzhen',
  'XIY': 'Xi\'an Xianyang',
  'HGH': 'Hangzhou Xiaoshan',
  'SGN': 'Ho Chi Minh City',
  'PKX': 'Beijing Daxing',
  'SHA': 'Shanghai Hongqiao',
  'DME': 'Moscow Domodedovo',
  'GMP': 'Seoul Gimpo',
  'ZRH': 'Zurich',
  'VIE': 'Vienna',
  'AMD': 'Ahmedabad',
  'COK': 'Kochi',
  'LKO': 'Lucknow',
  'GAU': 'Guwahati',
  'JAI': 'Jaipur',
  'BBI': 'Bhubaneswar',
  'SXR': 'Srinagar',
  'TRV': 'Thiruvananthapuram',
  'PAT': 'Patna',
  'IDR': 'Indore',
  'VTZ': 'Visakhapatnam',
  'CJB': 'Coimbatore',
  'IXM': 'Madurai',
  'IXB': 'Bagdogra',
  'IXE': 'Mangalore',
  'IXR': 'Ranchi',
  'IXL': 'Leh',
  'BHO': 'Bhopal',
  'VGA': 'Vijayawada',
  'DIB': 'Dibrugarh',
  'RJA': 'Rajahmundry',
  'AJL': 'Aizawl',
  'JDH': 'Jodhpur',
  'RAJ': 'Rajkot',
  'TIR': 'Tirupati',
  'IXS': 'Silchar',
  'IXC': 'Chandigarh',
  'GAY': 'Gaya',
  'AYJ': 'Ayodhya',
  'KBK': 'Kushinagar',
  'CNN': 'Kannur',
  'STV': 'Surat',
  'NAG': 'Nagpur',
  'UDR': 'Udaipur',
  'IXZ': 'Port Blair',
  'TEZ': 'Tezpur',
  'DMU': 'Dimapur',
  'IMF': 'Imphal',
  'DHM': 'Dharamsala',
  'SLV': 'Shimla',
  'TCR': 'Tuticorin',
  'JRH': 'Jorhat'
};

function FlightCard({ flight, onFlightClick, type }) {
  const isArrival = type === 'arrival';

  const relevantAirport = isArrival ? flight.departure : flight.arrival;
  
  const locationName = cityMap[relevantAirport.iata] || relevantAirport.airport;

  return (
    <li 
      className="py-3 cursor-pointer"
      onClick={() => onFlightClick(flight)}
    >
      <div className="flex justify-between items-center hover:bg-slate-700/50 -mx-4 px-4 rounded-md py-2 transition-colors">
        <div className="flex items-center space-x-4 min-w-0">
          <AirlineLogo airlineName={flight.airline.name} />
          <div className="min-w-0">
            <p className="font-mono text-slate-100 font-semibold truncate">
              {flight.airline.name} {flight.flight.iata}
            </p>
            <p className="text-sm text-slate-400 truncate">
              {isArrival 
                ? `From: ${locationName}` 
                : `To: ${locationName}`}
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
