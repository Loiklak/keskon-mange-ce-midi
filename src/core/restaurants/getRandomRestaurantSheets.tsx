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

  type FilterClause = Partial<RestaurantInfos>;

  const restaurantFilterClause: FilterClause = {
    canEatIn: restaurantType === RestaurantType.EAT_IN,
    canTakeAway: restaurantType === RestaurantType.TAKE_AWAY,
    vegetarianFriendly: diet === Diet.VEGETARIAN,
    meatLover: diet === Diet.MEATLOVER,
  };

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
    whereClause: FilterClause
  ): Boolean => {
    for (const key in whereClause) {
      if (!isRestaurantInfoKey(key, restaurant)) {
        throw new Error(`Invalid key ${key} in filter clause.`);
      } else if (whereClause[key] && !restaurant[key]) {
        return false;
      }
    }
    return true;
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurantSatisfiesClause(restaurant, restaurantFilterClause)
  );

  return filteredRestaurants[
    Math.floor(Math.random() * filteredRestaurants.length)
  ];
};
