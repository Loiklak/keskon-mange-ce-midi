import { getAllReviewsFromGoogleSheet } from "./getAllReview";

const groupBy = <TInput, TGroupByIndex extends keyof any>(
  array: TInput[],
  extractGroupByIndex: (i: TInput) => TGroupByIndex
) =>
  array.reduce(
    (groups, item) => {
      (groups[extractGroupByIndex(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<TGroupByIndex, TInput[]>
  );

const getRestaurantNameToReview = async () => {
  const allReview = await getAllReviewsFromGoogleSheet();
  const restaurantNameToReview = await groupBy(allReview, (i) => i.name);
  return restaurantNameToReview;
};

export const getReviewForRestaurant = async (restaurantName: string) => {
  const restaurantNameToReview = await getRestaurantNameToReview();
  const reviewForRestaurant = restaurantNameToReview[restaurantName];
  return reviewForRestaurant;
};
