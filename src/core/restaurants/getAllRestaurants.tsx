"use server";

import { Restaurant } from "@prisma/client";
import prisma from "../../../prisma/singleton";

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  return prisma.restaurant.findMany({
    orderBy: {
      name: "asc",
    },
  });
};
