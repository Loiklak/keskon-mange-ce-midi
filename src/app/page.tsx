"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import { getRandomRestaurant } from "@/core/restaurants/getRestaurants";
import { Restaurant } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  const [currentPickedRestaurant, setCurrentPickedRestaurant] = useState<
    Restaurant | undefined
  >();

  const pickRandomRestaurant = () => {
    setCurrentPickedRestaurant(undefined);
    getRandomRestaurant().then((restaurant) =>
      setCurrentPickedRestaurant(restaurant)
    );
  };

  return (
    <div className="p-10 flex flex-col items-center gap-12">
      <h1 className="text-5xl text-center">On mange quoi ce midi putain ?</h1>

      <button onClick={pickRandomRestaurant}>
        <RestaurantCard restaurant={currentPickedRestaurant} />
      </button>
    </div>
  );
}
