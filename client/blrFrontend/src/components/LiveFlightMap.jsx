import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { FiNavigation } from 'react-icons/fi';
import ReactDOMServer from 'react-dom/server';

function LiveFlightMap({ liveData }) {
  if (!liveData?.latitude || !liveData?.longitude) {
    return <p className="text-slate-400 text-sm mt-4">Live location data not available.</p>;
  }

  const position = [liveData.latitude, liveData.longitude];

  const planeIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToString(<FiNavigation color="#0ea5e9" size={24} style={{ transform: `rotate(${liveData.direction - 45}deg)` }} />))}`,
    iconSize: [32, 32],
    className: 'bg-slate-800/50 rounded-full p-1'
  });

  return (
    <div className="mt-4 h-64 w-full rounded-lg overflow-hidden border border-slate-700">
      <MapContainer center={position} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={planeIcon}>
          <Popup>
            Altitude: {liveData.altitude} ft <br />
            Speed: {liveData.speed_horizontal} kph
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LiveFlightMap;
