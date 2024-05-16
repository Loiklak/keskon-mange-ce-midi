import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { latLngBounds, Icon } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { positionTheodo } from "@/lib/utils";

interface Props {
  positionRestaurant: [number, number];
}

const MapContainerComponent = ({ positionRestaurant }: Props) => {
  const bounds = latLngBounds([positionRestaurant, positionTheodo]).pad(0.2);

  return (
    <MapContainer
      scrollWheelZoom={false}
      bounds={bounds}
      style={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={positionTheodo} icon={theodoIcon} />
      <Marker position={positionRestaurant} icon={restaurantIcon} />
    </MapContainer>
  );
};

export default MapContainerComponent;

const theodoIcon = new Icon({
  iconUrl: "./MarkerTheodo.png",
  shadowUrl: "./MarkerTheodoShadow.png",
  iconSize: [40, 40],
  shadowSize: [55, 55],
});

const restaurantIcon = new Icon({
  iconUrl: "./restaurant_pin_map.png",
  iconSize: [40, 40],
});
