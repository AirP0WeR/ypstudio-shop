"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { icon } from "leaflet"



export default function OpenStreetMap({ latitude, longitude }) {

  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const ZOOM_LEVEL = 12;
  const ICON = icon({
    iconUrl: "/images/pin_484167.png",
    iconSize: [32, 32],
  })

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: "400px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        <Marker
          position={[center.lat, center.lng]}
          icon={ICON}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

    </MapContainer>
  );
}
