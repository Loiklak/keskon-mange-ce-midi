import { Restaurant } from "@prisma/client";
import { FC } from "react";
import Tag from "./Tag";
import { getRandomEmoji } from "@/helpers/getRandomEmojis";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: FC<Props> = ({ restaurant }) => {
  return (
    <div className="p-5 shadow-xl rounded-xl flex flex-col gap-3 items-center h-52 w-52">
      <p className="text-6xl">{getRandomEmoji()}</p>
      <h2 className="text-2xl">{restaurant.name}</h2>

      <div className="flex gap-1 flex-wrap justify-center">
        {restaurant.canEatIn && <Tag>Sur place</Tag>}
        {restaurant.canTakeAway && <Tag>À emporter</Tag>}
      </div>
    </div>
  );
};

export default RestaurantCard;
