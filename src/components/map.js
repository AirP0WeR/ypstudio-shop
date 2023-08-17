"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";

export default function OpenStreetMap({ pvzs, city, stateFunction}) {

  const [center, setCenter] = useState({
    lat: city.data.geo_lat,
    lng: city.data.geo_lon,
  });

  const ZOOM_LEVEL = 11;
  const ICON = icon({
    iconUrl: "/images/pin_icon_green.svg.png",
    iconSize: [23, 32],
  });

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: "400px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pvzs.map((e) => (
        <Marker
          key={e.code}
          position={[e.location.latitude, e.location.longitude]}
          icon={ICON}
        >
          <Popup>
            <h1 className="text-lg font-bold">{e.location.address}</h1>
            <h1 className="text-xs mt-2">{e.work_time}</h1>
            <button className="btn btn-primary mt-2 w-full" onClick={() => stateFunction(e)}>
              Выбрать пункт
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
