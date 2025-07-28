import React from 'react';

function TransportWidget() {
  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 my-4 border border-slate-700">
      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-4">Getting to the Airport 🚗</h3>
      
      {/* This div will be a flex container on medium screens and up */}
      <div className="md:flex md:space-x-8">
        
        {/* Vayu Vajra Section */}
        <div className="flex-1 mb-4 md:mb-0">
          <h4 className="font-semibold text-slate-300">Vayu Vajra Bus Service</h4>
          <p className="text-sm text-slate-400 my-1">Airport shuttle buses are available from various points in the city.</p>
          <a 
            href="http://kias.mybmtc.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline text-sm"
          >
            View Schedules
          </a>
        </div>

        {/* This divider will only show on small screens */}
        <hr className="my-4 border-slate-700 md:hidden"/>

        {/* Taxi Section */}
        <div className="flex-1">
          <h4 className="font-semibold text-slate-300">App-Based Taxis</h4>
          <p className="text-sm text-slate-400 my-1">Book a ride for direct transport to the airport.</p>
          <a 
            href="https://m.uber.com/ul/?action=setPickup&pickup=my_location&destination[formatted_address]=Kempegowda%20International%20Airport%20Bengaluru" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline text-sm"
          >
            Book an Uber
          </a>
        </div>
      </div>
    </div>
  );
}

export default TransportWidget;