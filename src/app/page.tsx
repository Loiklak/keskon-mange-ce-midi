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
    <div className="p-2">
      <h1 className="text-5xl text-center">On mange quoi ce midi putain ?</h1>

      <div className="grid place-items-center mt-12 gap-8">
        <button
          onClick={pickRandomRestaurant}
          className="px-12 py-6 rounded-lg border border-solid"
        >
          On mange à...
        </button>

        <RestaurantCard restaurant={currentPickedRestaurant} />
      </div>
    </div>
  );
}
