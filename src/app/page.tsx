"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import { getRandomRestaurant } from "@/core/restaurants/getRandomRestaurants";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { RestaurantType } from "@/core/restaurants/restaurantType";
import { Option, SingleOptionPicker } from "@/components/SingleOptionPicker";
import { Diet } from "@/core/restaurants/diet";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {getRandomRestaurantSheets} from "@/core/restaurants/getRandomRestaurantSheets";
import { RestaurantInfos } from "@/core/restaurants/interface";

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

const dietOptions: Option<Diet>[] = [
  {
    value: Diet.MIXED,
    label: "Peu importe",
  },
  {
    value: Diet.VEGETARIAN,
    label: "Végé",
  },
  {
    value: Diet.MEATLOVER,
    label: "Viandard",
  },
];

const DIET_LOCAL_STORAGE_KEY = "diet";

export default function Home() {
  const [currentPickedRestaurantSheets, setCurrentPickedRestaurantSheets] = useState<
    RestaurantInfos | undefined
  >();
  const [currentPickedRestaurant, setCurrentPickedRestaurant] = useState<
    Restaurant | undefined
  >();
  const [restaurantType, setRestaurantType] = useState<RestaurantType>(
    RestaurantType.WHATEVER
  );
  const [diet, setDiet] = useLocalStorage<Diet>(
    DIET_LOCAL_STORAGE_KEY,
    Diet.MIXED
  );

  const pickRandomRestaurant = () => {
    setCurrentPickedRestaurant(undefined);
    getRandomRestaurant(restaurantType, diet).then((restaurant) =>
      setCurrentPickedRestaurant(restaurant)
    );
  };

  const pickRandomRestaurantSheets = () => {
    setCurrentPickedRestaurantSheets(undefined);
    getRandomRestaurantSheets(restaurantType, diet).then((restaurant) => {
      setCurrentPickedRestaurantSheets(restaurant)
    })
  }

  useEffect(() => {
    pickRandomRestaurant();
    pickRandomRestaurantSheets();
  }, [restaurantType, diet]);

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 p-10 lg:p-10">
      <h1
        className={`text-3xl lg:text-8xl text-center font-black drop-shadow-lg ${styles["background-image-text"]}`}
      >
        On mange quoi ce midi ?
      </h1>

      <div className="flex flex-col items-center gap-4">
        <SingleOptionPicker
          items={restaurantTypeOptions}
          value={restaurantType}
          onChange={(v) => setRestaurantType(v)}
          label="Type de restaurant"
        />

        <SingleOptionPicker
          items={dietOptions}
          value={diet}
          onChange={(v) => setDiet(v)}
          label="Régime alimentaire"
        />
      </div>

      <RestaurantCard
        restaurant={currentPickedRestaurantSheets}
        getNewRestaurant={pickRandomRestaurantSheets}
      />
    </div>
  );
}
