import React from 'react';
import { FiClock, FiSend, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

function FlightStatus({ status }) {
  const statusStyles = {
    scheduled: {
      icon: <FiClock />,
      text: 'Scheduled',
      classes: 'bg-slate-700 text-slate-300',
    },
    'en-route': {
      icon: <FiSend />,
      text: 'En-Route',
      classes: 'bg-sky-900 text-sky-300',
    },
    landed: {
      icon: <FiCheckCircle />,
      text: 'Landed',
      classes: 'bg-green-900 text-green-300',
    },
    delayed: {
      icon: <FiAlertTriangle />,
      text: 'Delayed',
      classes: 'bg-yellow-800 text-yellow-300',
    },
    cancelled: {
      icon: <FiXCircle />,
      text: 'Cancelled',
      classes: 'bg-red-900 text-red-300',
    },
    default: {
      icon: <FiClock />,
      text: status,
      classes: 'bg-slate-700 text-slate-300',
    }
  };

  const currentStatus = statusStyles[status] || statusStyles.default;

  return (
    <span className={`flex items-center space-x-2 text-xs md:text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap ${currentStatus.classes}`}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </span>
  );
}

export default FlightStatus;
