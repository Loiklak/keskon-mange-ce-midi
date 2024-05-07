import { RestaurantInfos } from "@/core/restaurants/interface"
import MapContainerComponent from "../MapContainerComponent/MapContainerComponent"
import styles from "./RestaurantInfosCard.module.css"

interface Props {
    restaurant?: RestaurantInfos;
}

export const RestaurantInfosCard = ({restaurant}:Props ) => {
    return (
        <div className={styles.mapZone}> 
            <p>{restaurant ? restaurant.name: "Je réfléchis"}</p>
            <MapContainerComponent></MapContainerComponent>
        </div>
    )
  }
