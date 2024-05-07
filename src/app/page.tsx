"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import RestaurantChoiceCard from "@/components/RestaurantChoiceCard/RestaurantChoiceCard";
import { useState } from "react";
import styles from "./page.module.css";
import { Restaurant } from "@prisma/client";

export default function Home() {
  const [currentRestaurant, setCurrentRestaurant] = useState<
    Restaurant | undefined
  >();

  const handleRestaurantChange = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.header} ${styles["background-image-text"]}`}>
        On mange quoi ce midi ?
      </h1>
      <div className={styles.content}>
        <div className={styles["choice-card"]}>
          <RestaurantChoiceCard onPickRestaurant={setCurrentRestaurant} />
        </div>
        <div className={styles["restaurant-card"]}>
          <RestaurantCard restaurant={currentRestaurant} />
        </div>
      </div>
    </div>
  );
}
