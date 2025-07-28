import React from 'react';

function Navbar() {
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

          {/* Navigation Links (for future use) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Flights</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Airport Guide</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;