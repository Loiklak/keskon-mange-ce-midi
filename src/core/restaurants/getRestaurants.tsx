"use server";

import { Restaurant } from "@prisma/client";
import prisma from "../../../prisma/singleton";
import { RestaurantType } from "./restaurantType";
import { Diet } from "./diet";

export const getRandomRestaurant = async (
  restaurantType: RestaurantType,
  diet: Diet
): Promise<Restaurant> => {
  const whereClause = {
    canEatIn: restaurantType === RestaurantType.EAT_IN ? true : undefined,
    canTakeAway: restaurantType === RestaurantType.TAKE_AWAY ? true : undefined,
    vegetarianFriendly: diet === Diet.VEGETARIAN ? true : undefined,
    meatLover: diet === Diet.MEATLOVER ? true : undefined,
  };

  const restaurantCount = await prisma.restaurant.count({ where: whereClause });
  const skip = Math.floor(Math.random() * restaurantCount);
  const arrayWithRandomRestaurant = await prisma.restaurant.findMany({
    take: 1,
    skip: skip,
    where: whereClause,
  });

  return arrayWithRandomRestaurant[0];
};
