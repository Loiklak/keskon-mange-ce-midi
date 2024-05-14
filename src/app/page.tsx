"use client";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import RestaurantChoiceCard from "@/components/RestaurantChoiceCard/RestaurantChoiceCard";
import styles from "./page.module.css";
import { Restaurant } from "@prisma/client";
import { useShakeAnimation } from "@/components/RestaurantChoiceCard/useShakeAnimation";
import { useState } from "react";

export default function Home() {
  const [currentRestaurant, setCurrentRestaurant] = useState<
    Restaurant | undefined
  >();

  const { animationContainerRef, startAnimate, stopAnimate } =
    useShakeAnimation<HTMLButtonElement>();

  return (
    <div className={styles.container}>
      <h1 className={`${styles.header} ${styles["background-image-text"]}`}>
        On mange quoi ce midi ?
      </h1>
      <div className={styles.content}>
        <div className={styles["choice-card"]}>
          <RestaurantChoiceCard
            onPickRestaurant={setCurrentRestaurant}
            currentRestaurantPicked={currentRestaurant}
          />
        </div>
        <div className={styles["restaurant-card"]}>
          <RestaurantCard
            restaurant={currentRestaurant}
            startAnimate={startAnimate}
            stopAnimate={stopAnimate}
            animRef={animationContainerRef}
          />
        </div>
      </div>
    </div>
  );
}
