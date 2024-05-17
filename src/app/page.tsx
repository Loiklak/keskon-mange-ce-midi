"use client";
import RestaurantChoiceCard from "@/components/RestaurantChoiceCard/RestaurantChoiceCard";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Rat from "@/components/Rat/Rat";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { RestaurantInfos } from "@/core/restaurants/interface";
import { useShakeAnimation } from "@/components/RestaurantChoiceCard/useShakeAnimation";

export default function Home() {
  useEffect(() => {
    const [navigation] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    if (navigation) {
      if (navigation.type === "reload") {
        localStorage.clear();
      }
    }
  }, []);

  const [currentRestaurant, setCurrentRestaurant] = useState<
    RestaurantInfos | undefined
  >();

  const { animationContainerRef, startAnimate, stopAnimate } =
    useShakeAnimation<HTMLButtonElement>();

  const [isRatModeActivated, setIsRatModeActivated] = useState<boolean>();

  const nbRatsRow = 6;
  const nbRatsCol = 36;

  const ratModeClassName = isRatModeActivated
    ? "fixed top-0 left-0 w-full h-full z-[-1] grid grid-cols-6 grid-rows-8"
    : "";

  return (
    <>
      {isRatModeActivated && (
        <div className={ratModeClassName}>
          {[...Array(nbRatsRow)].map((_, rowIndex) => (
            <div key={rowIndex}>
              {[...Array(nbRatsCol)].map((_, colIndex) => (
                <div key={colIndex}>
                  <Rat />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className={styles.container}>
        <h1 className={`${styles.header} ${styles["background-image-text"]}`}>
          On mange quoi ce midi ?
        </h1>
        <div className={styles.content}>
          <div className={styles["choice-card"]}>
            <RestaurantChoiceCard
              onPickRestaurant={setCurrentRestaurant}
              currentRestaurantPicked={currentRestaurant}
              onRatModeChange={setIsRatModeActivated}
              isRatModeActivated={isRatModeActivated}
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
    </>
  );
}
