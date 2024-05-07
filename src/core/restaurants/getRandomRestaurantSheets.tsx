"use server";
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
  console.log("whereClause : ", whereClause);

  type CorrectKey = keyof RestaurantInfos;

  function isRestaurantInfoKey(
    key: any,
    restaurant: RestaurantInfos
  ): key is CorrectKey {
    const expectedKeys = Object.keys(restaurant);
    return expectedKeys.includes(key);
  }

  const restaurantSatisfiesClause = (
    restaurant: RestaurantInfos,
    whereClause: any
  ): Boolean => {
    for (const key in whereClause) {
      if (
        !isRestaurantInfoKey(key, restaurant) ||
        (whereClause[key] !== undefined && restaurant[key] !== whereClause[key])
      ) {
        return false;
      }
    }
    return true;
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurantSatisfiesClause(restaurant, whereClause)
  );

  console.log("filtered restos : ", filteredRestaurants);
  console.log(
    "final resto : ",
    filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)]
  );
  return filteredRestaurants[
    Math.floor(Math.random() * filteredRestaurants.length)
  ];
};
