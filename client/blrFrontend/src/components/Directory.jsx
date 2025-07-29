// src/components/Directory.jsx
import React, { useState, useMemo } from 'react';
import { directoryData } from '../data/directory';

const categories = ['All', 'Food', 'Shopping', 'Services'];

function Directory() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredData = useMemo(() => {
    if (activeCategory === 'All') return directoryData;
    return directoryData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-4 md:p-6 border border-slate-700">
      <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Airport Directory 🍽️🛍️</h2>
      
      {/* Category Filter Buttons */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category 
              ? 'bg-sky-500 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Directory List */}
      <ul className="divide-y divide-slate-700">
        {filteredData.map((item, index) => (
          <li key={index} className="py-3">
            <p className="font-semibold text-slate-100">{item.name}</p>
            <p className="text-sm text-slate-400">{item.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Directory;
