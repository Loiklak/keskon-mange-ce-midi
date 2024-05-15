"use client";
import { FC, useEffect, useState } from "react";
import { RestaurantType } from "@/core/restaurants/restaurantType";
import { RestaurantInfos } from "@/core/restaurants/interface";
import {
  Option,
  SingleOptionPicker,
} from "@/components/RestaurantChoiceCard/OptionPicker/SingleOptionPicker";
import { Diet } from "@/core/restaurants/diet";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getRandomRestaurantSheets } from "@/core/restaurants/getRandomRestaurantSheets";
import { ToggleOptionPicker } from "./OptionPicker/ToggleOptionPicker";
import { useShakeAnimation } from "./useShakeAnimation";
import { on } from "events";

interface Props {
  onPickRestaurant: (restaurant: RestaurantInfos | undefined) => void;
  currentRestaurantPicked: RestaurantInfos | undefined;
}

const restaurantTypeOptions: Option<RestaurantType>[] = [
  {
    value: RestaurantType.WHATEVER,
    label: "Peu importe",
  },
  {
    value: RestaurantType.EAT_IN,
    label: "Sur place",
  },
  {
    value: RestaurantType.TAKE_AWAY,
    label: "À emporter",
  },
];

const dietOptions: Option<Diet>[] = [
  {
    value: Diet.MIXED,
    label: "Peu importe",
  },
  {
    value: Diet.VEGETARIAN,
    label: "Végé",
  },
  {
    value: Diet.MEATLOVER,
    label: "Viandard",
  },
];

const DIET_LOCAL_STORAGE_KEY = "diet";

const RestaurantChoiceCard: FC<Props> = ({
  onPickRestaurant,
  currentRestaurantPicked,
}) => {
  const [restaurantType, setRestaurantType] = useState<RestaurantType>(
    RestaurantType.WHATEVER
  );
  const [diet, setDiet] = useLocalStorage<Diet>(
    DIET_LOCAL_STORAGE_KEY,
    Diet.MIXED
  );

  const [isRatModeActivated, setIsRatModeActivated] = useState<boolean>(false);

  const pickRandomRestaurant = () => {
    onPickRestaurant(undefined);
    getRandomRestaurantSheets(restaurantType, diet, isRatModeActivated).then(
      (restaurant: RestaurantInfos | undefined) => {
        onPickRestaurant(restaurant);
      }
    );
  };

  useEffect(() => {
    pickRandomRestaurant();
  }, []);

  return (
    <div className="bg-white p-5 shadow-2xl rounded-xl flex flex-col gap-3 text-center max-w-screen-md">
      <div className="flex flex-col items-center gap-4">
        <SingleOptionPicker
          items={restaurantTypeOptions}
          value={restaurantType}
          onChange={(v) => setRestaurantType(v)}
          label="Type de restaurant"
        />

        <SingleOptionPicker
          items={dietOptions}
          value={diet}
          onChange={(v) => setDiet(v)}
          label="Régime alimentaire"
        />

        <ToggleOptionPicker
          label="Mode rat 🐀"
          onChange={(v) => setIsRatModeActivated(v)}
        />
        <button
          onClick={pickRandomRestaurant}
          className={`font-bold py-2 px-4 rounded flex-auto flex-col ${
            currentRestaurantPicked
              ? "bg-red-500 hover:bg-red-700 text-white"
              : "bg-red-700 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!currentRestaurantPicked}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default RestaurantChoiceCard;
