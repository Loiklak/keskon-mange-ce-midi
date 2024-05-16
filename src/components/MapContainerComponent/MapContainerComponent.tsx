import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { latLngBounds, Icon } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { positionTheodo } from "@/lib/utils";

interface Props {
  name: string;
  positionRestaurant: [number, number] | undefined;
}

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

const MapContainerComponent = ({ name, positionRestaurant }: Props) => {
  if (!positionRestaurant) {
    return null;
  }

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
      <Marker position={positionRestaurant} icon={restaurantIcon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapContainerComponent;
