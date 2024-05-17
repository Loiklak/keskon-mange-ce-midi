import { FC, useEffect } from "react";
import { RestaurantInfos } from "@/core/restaurants/interface";
import { Badge } from "../ui/badge";
import styles from "./RestaurantCard.module.css";
import { X } from "lucide-react";
import { ReviewCarousel } from "./Review/ReviewCarousel";
import { MapInfosComponent } from "../MapInfosComponent/MapInfosComponent";

type Props = {
  restaurant: RestaurantInfos | undefined;
  startAnimate: any;
  stopAnimate: any;
  animRef: any;
};

const RestaurantCard: FC<Props> = ({
  restaurant,
  startAnimate,
  stopAnimate,
  animRef,
}) => {
  useEffect(() => {
    if (restaurant === undefined) {
      startAnimate();
    } else {
      stopAnimate();
    }
  }, [restaurant]);

  return (
    <div className={styles["restaurant-card"]} ref={animRef}>
      <div className={styles["inner-card"]}>
        <h1 className={styles["restaurant-name"]}>{restaurant?.name}</h1>
        <h2 className={styles["restaurant-description"]}>
          {restaurant?.description}
        </h2>
      </div>
      <div className={styles.possibilities}>
        <div>
          <div className={styles["possibilities-content"]}>
            {restaurant?.canTakeAway ? <Badge>À emporter</Badge> : ""}
            {restaurant?.canEatIn ? <Badge>Sur place</Badge> : ""}
            {restaurant?.vegetarianFriendly ? <Badge>Végé</Badge> : ""}
            {restaurant?.meatLover ? <Badge>Viandard</Badge> : ""}
            {restaurant?.lessThanTenEuros ? <Badge>Ratus</Badge> : ""}
          </div>
          <div className={styles["badge-container"]}>
            {restaurant?.name &&
              <ReviewCarousel restaurantName={restaurant?.name} />
            }
          </div>
        </div>
        <div className={styles["map-container"]}>
          <MapInfosComponent restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
