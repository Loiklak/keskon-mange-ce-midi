export interface RestaurantInfos {
  name: string;
  canEatIn: boolean;
  canTakeAway: boolean;
  vegetarianFriendly: boolean;
  meatLover: boolean;
  mapUrl: string | null;
  lessThanTenEuros: boolean;
  restaurantPosition: [number, number] | undefined;
}

export type RestaurantBooleanKeys = keyof {
  [Key in keyof RestaurantInfos as RestaurantInfos[Key] extends boolean
    ? Key
    : never]: never;
};

const objectBooleanKeys: Record<RestaurantBooleanKeys, undefined> = {
  canEatIn: undefined,
  canTakeAway: undefined,
  vegetarianFriendly: undefined,
  meatLover: undefined,
  lessThanTenEuros: undefined,
};
export const restaurantBooleanKeys = Object.keys(objectBooleanKeys);
