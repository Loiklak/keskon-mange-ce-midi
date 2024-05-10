import { RestaurantInfos } from "@/core/restaurants/interface";
import MapContainerComponent from "../MapContainerComponent/MapContainerComponent";
import styles from "./RestaurantInfosCard.module.css";
import { calculateDistance, positionTheodo, walkingSpeed } from "@/lib/utils";

interface Props {
  restaurant?: RestaurantInfos;
}

export const RestaurantInfosCard = ({ restaurant }: Props) => {
  if (!restaurant) {
    return null;
  }
  if (!restaurant.restaurantPosition) {
    return null;
  }
  const distanceRestaurantTheodoKM: number = calculateDistance(
    positionTheodo,
    restaurant.restaurantPosition
  );
  const distanceRestaurantTheodoM = distanceRestaurantTheodoKM * 1000;
  const timeRestaurantTheodo = (60 * distanceRestaurantTheodoKM) / walkingSpeed;
  return (
    <div>
      <p>
        {`${restaurant.name} : ${Math.round(timeRestaurantTheodo)} min (${Math.round(distanceRestaurantTheodoM)} m)`}
      </p>
      <div className={styles.mapZone}>
        <MapContainerComponent
          name={restaurant.name}
          positionRestaurant={restaurant.restaurantPosition}
        ></MapContainerComponent>
      </div>
    </div>
  );
};
