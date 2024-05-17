import { RestaurantInfos } from "@/core/restaurants/interface";
import MapContainerComponent from "../MapContainerComponent/MapContainerComponent";
import styles from "./RestaurantInfosCard.module.css";

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
    return (
    <div>
        <div className={styles.mapZone}> 
        <MapContainerComponent
          name={restaurant.name}
          positionRestaurant={restaurant.restaurantPosition}
        ></MapContainerComponent>
      </div>
        </div>
  );
};
