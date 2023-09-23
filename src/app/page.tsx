"use client";
import {
  Restaurant,
  getRandomRestaurant,
} from "@/core/restaurants/getRestaurants";
import { useState } from "react";

export default function Home() {
  const [currentPickedRestaurant, setCurrentPickedRestaurant] = useState<
    Restaurant | undefined
  >();

  const pickRandomRestaurant = () => {
    getRandomRestaurant().then((restaurant) =>
      setCurrentPickedRestaurant(restaurant)
    );
  };

  return (
    <div className="p-2">
      <h1 className="text-5xl text-center">On mange quoi ce midi putain ?</h1>

      <div className="grid place-items-center mt-12 gap-6">
        <button
          onClick={pickRandomRestaurant}
          className="px-12 py-6 rounded-lg border border-solid"
        >
          On mange à...
        </button>

        {currentPickedRestaurant !== undefined ? (
          <p className="text-xl">{currentPickedRestaurant.name}</p>
        ) : (
          <p className="text-xl">Je sais pas :(</p>
        )}
      </div>
    </div>
  );
}
