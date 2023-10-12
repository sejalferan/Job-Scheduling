import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <>
   <MapContainer center={[20.475300, 78.424476]} zoom={13}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   </MapContainer>
   </>
  );
}

export default Map;