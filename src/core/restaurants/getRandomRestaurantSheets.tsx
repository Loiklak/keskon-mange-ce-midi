"use server";

import { Restaurant } from "@prisma/client";
import prisma from "../../../prisma/singleton";
import { RestaurantType } from "./restaurantType";
import { Diet } from "./diet";
import { getAllRestaurantsSheets } from "./getAllRestaurantsSheets";
import { RestaurantInfos } from "./interface";

export const getRandomRestaurantSheets = async (
  restaurantType: RestaurantType,
  diet: Diet
): Promise<RestaurantInfos> => {
  const restaurants = await getAllRestaurantsSheets();

  const whereClause = {
    canEatIn: restaurantType === RestaurantType.EAT_IN ? true : undefined,
    canTakeAway: restaurantType === RestaurantType.TAKE_AWAY ? true : undefined,
    vegetarianFriendly: diet === Diet.VEGETARIAN ? true : undefined,
    meatLover: diet === Diet.MEATLOVER ? true : undefined,
  };
  console.log("whereClause : ", whereClause)
  
  type CorrectKey = keyof RestaurantInfos


  // Correct clause keys are the keys of the RestaurantInfos interface
  function isCorrectKey(key: any, restaurant: RestaurantInfos): key is CorrectKey {
    const expectedKeys = Object.keys(restaurant)
    return expectedKeys.includes(key)
  }

  const restaurantSatisfiesClause = (restaurant: RestaurantInfos, whereClause: any): Boolean => {
    for (const key in whereClause) {
      if (!isCorrectKey(key, restaurant) || (whereClause[key] !== undefined && restaurant[key] !== whereClause[key])) {
        return false
      }
    }
    return true
  }

  const filteredRestaurants = restaurants.filter(restaurant => restaurantSatisfiesClause(restaurant, whereClause))

  console.log("filtered restos : ", filteredRestaurants)
  console.log("final resto : ", filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)])
  return filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
}