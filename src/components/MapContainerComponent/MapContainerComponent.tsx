import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, latLngBounds } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

interface Props {
  name: string;
  positionRestaurant: [number, number];
}

const MapContainerComponent = ({ name, positionRestaurant }: Props) => {
  const positionTheodo: LatLngExpression = [48.882737, 2.322391];
  const bounds = latLngBounds([positionRestaurant, positionTheodo]);

  return (
    <MapContainer
      scrollWheelZoom={false}
      bounds={bounds}
      style={{ height: "100%", width: "100%", borderRadius: "10%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={positionTheodo}>
        <Popup>Theodo</Popup>
      </Marker>
      <Marker position={positionRestaurant}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapContainerComponent;
