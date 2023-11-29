import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

function MapComponent(props){
  const position = props.coords; 
  const pinIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/pin.png', 
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],

  });
  return (
    <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={pinIcon}>
      <Popup>
          <a href={props.url}>Open Google Maps</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
