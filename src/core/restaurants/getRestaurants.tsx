"use server";

import { Restaurant } from "@prisma/client";
import prisma from "../../../prisma/singleton";
import { RestaurantType } from "./restaurantType";

export const getRandomRestaurant = async (
  restaurantType: RestaurantType = RestaurantType.WHATEVER
): Promise<Restaurant> => {
  const whereClause = {
    canEatIn: restaurantType === RestaurantType.EAT_IN ? true : undefined,
    canTakeAway: restaurantType === RestaurantType.TAKE_AWAY ? true : undefined,
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
