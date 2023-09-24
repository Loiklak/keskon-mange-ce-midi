"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import { getRandomRestaurant } from "@/core/restaurants/getRestaurants";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

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

  useEffect(() => {
    getRandomRestaurant().then((restaurant) =>
      setCurrentPickedRestaurant(restaurant)
    );
  }, []);

  return (
    <div className="flex flex-col items-center bg-slate-100 h-full gap-12 p-10  lg:gap-24 lg:p-16">
      <h1
        className={`text-6xl lg:text-8xl text-center font-black drop-shadow-lg ${styles["background-image-text"]}`}
      >
        On mange quoi ce midi ?
      </h1>

      <button onClick={pickRandomRestaurant}>
        <RestaurantCard restaurant={currentPickedRestaurant} />
      </button>
    </div>
  );
}
