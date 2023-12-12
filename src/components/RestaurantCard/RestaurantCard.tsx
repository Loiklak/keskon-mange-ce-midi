"use client";
import { Restaurant } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { getRandomEmoji } from "@/helpers/getRandomEmojis";
import { useShakeAnimation } from "./useShakeAnimation";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

interface Props {
  restaurant?: Restaurant;
  getNewRestaurant: () => void;
}

const RestaurantCard: FC<Props> = ({ restaurant, getNewRestaurant }) => {
  const [currentEmoji, setCurrentEmoji] = useState<string>("✨");
  const { animationContainerRef, startAnimate, stopAnimate } =
    useShakeAnimation<HTMLButtonElement>();

  useEffect(() => {
    setCurrentEmoji(getRandomEmoji());
  }, [restaurant]);

  useEffect(() => {
    if (restaurant === undefined) {
      startAnimate();
    } else {
      stopAnimate();
    }
  }, [restaurant]);

  return (
    <div className="flex gap-8">
      <button
        className="bg-white p-5 shadow-2xl rounded-xl flex flex-col gap-3 items-center h-52 w-52 lg:h-80 lg:w-80 lg:gap-6 lg:p-6 m-6"
        ref={animationContainerRef}
        onClick={getNewRestaurant}
      >
        <p className="text-6xl lg:text-8xl">
          {restaurant ? currentEmoji : "✨"}
        </p>
        <h2 className="text-2xl lg:text-5xl">
          {restaurant ? restaurant.name : "Je réfléchis..."}
        </h2>

        <div className="flex gap-1 flex-wrap justify-center">
          {restaurant?.canEatIn && <Badge variant={"outline"}>Sur place</Badge>}
          {restaurant?.canTakeAway && (
            <Badge variant={"outline"}>À emporter</Badge>
          )}
        </div>
      </button>

      <div className="flex flex-col justify-center">
        {restaurant?.mapUrl && (
          <a
            className="flex gap-2 lg:text-xl"
            href={restaurant?.mapUrl}
            target="_blank"
          >
            <span className="whitespace-nowrap">Go</span>
            <ArrowRight />
          </a>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
