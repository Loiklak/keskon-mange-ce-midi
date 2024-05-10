import { RestaurantInfos } from "@/core/restaurants/interface";
import MapContainerComponent from "../MapContainerComponent/MapContainerComponent";
import styles from "./RestaurantInfosCard.module.css";

interface Props {
  restaurant?: RestaurantInfos;
}

export const RestaurantInfosCard = ({ restaurant }: Props) => {
  return (
    <div>
      <p>{restaurant ? restaurant.name : "Je réfléchis"}</p>
      <div className={styles.mapZone}>
        {restaurant ? (
          <MapContainerComponent
            name={restaurant.name}
            positionRestaurant={restaurant.restaurantPosition}
          ></MapContainerComponent>
        ) : (
          <div>Je réfléchis</div>
        )}
      </div>
    </div>
  );
};
