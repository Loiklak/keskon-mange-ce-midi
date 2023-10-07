"use client";
import { Restaurant } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { getRandomEmoji } from "@/helpers/getRandomEmojis";
import { useShakeAnimation } from "./useShakeAnimation";
import { Badge } from "../ui/badge";

interface Props {
  restaurant?: Restaurant;
}

const RestaurantCard: FC<Props> = ({ restaurant }) => {
  const [currentEmoji, setCurrentEmoji] = useState<string>("✨");
  const { animationContainerRef, startAnimate, stopAnimate } =
    useShakeAnimation();

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
    <div
      className="bg-white p-5 shadow-2xl rounded-xl flex flex-col gap-3 items-center h-52 w-52 lg:h-96 lg:w-96 lg:gap-10 lg:p-10"
      ref={animationContainerRef}
    >
      <p className="text-6xl lg:text-9xl">{restaurant ? currentEmoji : "✨"}</p>
      <h2 className="text-2xl lg:text-5xl">
        {restaurant ? restaurant.name : "Je réfléchis..."}
      </h2>

      <div className="flex gap-1 flex-wrap justify-center">
        {restaurant?.canEatIn && <Badge variant={"outline"}>Sur place</Badge>}
        {restaurant?.canTakeAway && (
          <Badge variant={"outline"}>À emporter</Badge>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
