import React from 'react';

const SkeletonRow = () => (
  <li className="py-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-48 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2 text-right">
        <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
        <div className="h-3 w-12 bg-slate-700 rounded animate-pulse ml-auto"></div>
      </div>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2 animate-pulse"></div>
  </li>
);

function FlightListSkeleton() {
  return (
    <ul className="divide-y divide-slate-700">
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </ul>
  );
}

export default FlightListSkeleton;
