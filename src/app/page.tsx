"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import { getRandomRestaurant } from "@/core/restaurants/getRestaurants";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { RestaurantType } from "@/core/restaurants/restaurantType";
import { Option, SingleOptionPicker } from "@/components/SingleOptionPicker";

const restaurantTypeOptions: Option<RestaurantType>[] = [
  {
    value: RestaurantType.WHATEVER,
    label: "Peu importe",
  },
  {
    value: RestaurantType.EAT_IN,
    label: "Sur place",
  },
  {
    value: RestaurantType.TAKE_AWAY,
    label: "À emporter",
  },
];

export default function Home() {
  const [currentPickedRestaurant, setCurrentPickedRestaurant] = useState<
    Restaurant | undefined
  >();
  const [restaurantType, setRestaurantType] = useState<RestaurantType>(
    RestaurantType.WHATEVER
  );

  const pickRandomRestaurant = () => {
    setCurrentPickedRestaurant(undefined);
    getRandomRestaurant(restaurantType).then((restaurant) =>
      setCurrentPickedRestaurant(restaurant)
    );
  };

  useEffect(() => {
    pickRandomRestaurant();
  }, []);

  return (
    <div className="flex flex-col items-center bg-slate-100 h-full gap-8 p-10  lg:gap-20 lg:p-16">
      <h1
        className={`text-6xl lg:text-8xl text-center font-black drop-shadow-lg ${styles["background-image-text"]}`}
      >
        On mange quoi ce midi ?
      </h1>

      <SingleOptionPicker
        items={restaurantTypeOptions}
        value={restaurantType}
        onChange={(v) => setRestaurantType(v)}
      />

      <RestaurantCard
        restaurant={currentPickedRestaurant}
        getNewRestaurant={pickRandomRestaurant}
      />
    </div>
  );
}
