"use server";

import { Restaurant } from "@prisma/client";
import prisma from "../../../prisma/singleton";

export const getRandomRestaurant = async (): Promise<Restaurant> => {
  const restaurantCount = await prisma.restaurant.count();
  const skip = Math.floor(Math.random() * restaurantCount);
  const arrayWithRandomRestaurant = await prisma.restaurant.findMany({
    take: 1,
    skip: skip,
  });

  return arrayWithRandomRestaurant[0];
};
