"use server";
import { RestaurantType } from "./restaurantType";
import { Diet } from "./diet";
import { getAllRestaurantsSheets } from "./getAllRestaurantsSheets";
import { RestaurantInfos } from "./interface";

export const getRandomRestaurantSheets = async (
  restaurantType: RestaurantType,
  diet: Diet,
  ratMode: boolean | undefined,
  restaurants : RestaurantInfos[],
): Promise<RestaurantInfos> => {

  const userChoiceFilter: Record<CorrectUserChoiceFilterKey, boolean> = {
    eatInMandatory: restaurantType === RestaurantType.EAT_IN,
    takeAwayMandatory: restaurantType === RestaurantType.TAKE_AWAY,
    vegetarianOptionMandatory: diet === Diet.VEGETARIAN,
    meatOptionMandatory: diet === Diet.MEATLOVER,
    lessThanTenEurosMandatory: ratMode === true,
  };

  const USER_CHOICE_TO_RESTAURANT_PROPERTIES = {
    eatInMandatory: "canEatIn",
    takeAwayMandatory: "canTakeAway",
    vegetarianOptionMandatory: "vegetarianFriendly",
    meatOptionMandatory: "meatLover",
    lessThanTenEurosMandatory: "lessThanTenEuros",
  } as const;

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurantSatisfiesUserChoice(restaurant, userChoiceFilter)
  );

  return filteredRestaurants[
    Math.floor(Math.random() * filteredRestaurants.length)
  ];

  function restaurantSatisfiesUserChoice(
    restaurant: RestaurantInfos,
    userChoiceFilter: Record<CorrectUserChoiceFilterKey, boolean>
  ): Boolean {
    for (const key in userChoiceFilter) {
      if (isCorrectUserChoiceFilterKey(key)) {
        if (
          userChoiceFilter[key] &&
          !restaurant[USER_CHOICE_TO_RESTAURANT_PROPERTIES[key]]
        ) {
          return false;
        }
      } else {
        throw new Error(`Invalid key ${key} in filter clause.`);
      }
    }
    return true;
  }

  function isCorrectUserChoiceFilterKey(
    key: string
  ): key is CorrectUserChoiceFilterKey {
    const correctUserChoiceFilterKeys = Object.keys(
      USER_CHOICE_TO_RESTAURANT_PROPERTIES
    );
    return correctUserChoiceFilterKeys.includes(key);
  }

  type CorrectUserChoiceFilterKey =
    keyof typeof USER_CHOICE_TO_RESTAURANT_PROPERTIES;
};
