"use server";
import { getAllRestaurants } from "@/core/restaurants/getAllRestaurants";
import { getAllRestaurantsSheets } from "@/core/restaurants/getAllRestaurantsSheets";

const booleanToLabel = (value: boolean) => (value ? "✅" : "❌");

export default async function RestaurantList() {
  const restaurants = await getAllRestaurants();
  const restaurantsSheets = await getAllRestaurantsSheets();

  return (
    <table className="border-spacing-y-4 border-spacing-x-6 border-separate">
      <thead>
        <tr>
          <th>Restaurant</th>
          <th>Sur place</th>
          <th>A emporter</th>
          <th>Vege</th>
          <th>Viandard</th>
        </tr>
      </thead>
      <tbody>
        {restaurantsSheets.map((restaurant) => (
          <tr key={restaurant.name}>
            <td>{restaurant.name}</td>
            <td>{booleanToLabel(restaurant.canEatIn)}</td>
            <td>{booleanToLabel(restaurant.canTakeAway)}</td>
            <td>{booleanToLabel(restaurant.vegetarianFriendly)}</td>
            <td>{booleanToLabel(restaurant.meatLover)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
