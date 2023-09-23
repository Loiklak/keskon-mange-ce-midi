"use client";
import { Restaurant } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import Tag from "./Tag";
import { getRandomEmoji } from "@/helpers/getRandomEmojis";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: FC<Props> = ({ restaurant }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
  }, [restaurant]);

  return (
    <div
      onAnimationEnd={() => setIsAnimating(false)}
      className={`p-5 shadow-xl rounded-xl flex flex-col gap-3 items-center h-52 w-52 ${
        isAnimating && "animate-pulse-loader"
      }`}
    >
      <p className="text-6xl">{isAnimating ? "✨" : getRandomEmoji()}</p>
      <h2 className="text-2xl">{isAnimating ? "????" : restaurant.name}</h2>

      {!isAnimating && (
        <div className="flex gap-1 flex-wrap justify-center">
          {restaurant.canEatIn && <Tag>Sur place</Tag>}
          {restaurant.canTakeAway && <Tag>À emporter</Tag>}
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
