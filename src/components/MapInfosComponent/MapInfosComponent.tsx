import { RestaurantInfos } from "@/core/restaurants/interface";
import styles from "./MapInfosComponent.module.css";
import { calculateDistance, positionTheodo, walkingSpeed } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapContainerComponent = dynamic(
  () => import("../MapContainerComponent/MapContainerComponent"),
  {
    ssr: false,
    loading: () => (
      <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
    ),
  }
);

interface Props {
  restaurant?: RestaurantInfos;
}

export const MapInfosComponent = ({ restaurant }: Props) => {
  if (!restaurant) {
    return null;
  }
  if (!restaurant.restaurantPosition) {
    return (
      <div className={styles.mapZone}>
        <p>{`Oups, il nous manque des infos sur ce resto`}</p>
        <p>{`----------`}</p>
        <p>
          {`Vous pouvez améliorer ce site en complétant les infos du resto (URL Google Maps valide) sur le lien ci-dessous`}
        </p>
        <p>{`👇👇👇👇👇👇`}</p>
        <a
          href={`https://docs.google.com/spreadsheets/d/1B1kD-kZQiJUEYcSmAXom_lY7_JhOLp9UTq0Uf44wNY0/edit#gid=0`} //document id = variable d'environnement
          target="_blank"
          className={styles.lien}
        >
          Google Sheets
        </a>
      </div>
    );
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
        {`${Math.round(timeRestaurantTheodo)} min (${Math.round(distanceRestaurantTheodoM)} m)`}
      </p>
      <div className={styles.mapZone}>
        <MapContainerComponent
          positionRestaurant={restaurant.restaurantPosition}
        ></MapContainerComponent>
      </div>
    </div>
  );
};
