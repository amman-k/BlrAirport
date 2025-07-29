import React from 'react';
import { FiSun, FiCloud, FiCloudRain } from 'react-icons/fi';

// Static data for the forecast
const forecastData = [
  { day: 'Today', icon: <FiSun className="text-yellow-400" />, high: 29, low: 21, desc: 'Clear Skies' },
  { day: 'Tomorrow', icon: <FiCloud className="text-slate-400" />, high: 28, low: 22, desc: 'Cloudy' },
  { day: 'Day After', icon: <FiCloudRain className="text-sky-400" />, high: 27, low: 21, desc: 'Light Rain' },
];

function WeatherForecast() {
  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-4">Weather Forecast 🌦️</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        {forecastData.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-slate-700/50 rounded-lg">
            <p className="font-semibold text-sm text-slate-300">{item.day}</p>
            <div className="text-4xl my-2">{item.icon}</div>
            <p className="font-bold text-lg text-white">{item.high}°</p>
            <p className="text-sm text-slate-400">{item.low}°</p>
            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
