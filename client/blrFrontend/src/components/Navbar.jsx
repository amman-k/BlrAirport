import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Navbar() {

    const [currentTime,setCurrentTime]=useState(new Date());

    useEffect(()=>{
        const timerId=setInterval(()=>{
            setCurrentTime(new Date());
        },1000);

        return ()=>clearInterval(timerId);
    },[]);

    const formatTime = (date) => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl" role="img" aria-label="airplane">✈️</span>
            <span className="font-bold text-xl text-white">
              BLR Dashboard
            </span>
          </div>

          {/* Live Clock Section */}
          <div className="text-center">
            <p className="text-lg font-mono text-sky-400">{formatTime(currentTime)}</p>
            <p className="text-xs text-slate-500">IST</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;