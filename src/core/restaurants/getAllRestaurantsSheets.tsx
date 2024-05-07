"use server";

import { get } from "http";
import { emitKeypressEvents } from "readline";
import {
  RestaurantBooleanKeys,
  RestaurantInfos,
  restaurantBooleanKeys,
} from "./interface";

const RESTAURANTS_SHEET_ID = process.env.RESTAURANTS_SHEET_ID;
const SHEET_VALUE_RANGE = process.env.SHEET_VALUE_RANGE;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const SHEETS_COLUMNS_TO_TECHNICAL_NAME = {
  Restaurant: "name",
  "Sur place": "canEatIn",
  "A emporter": "canTakeAway",
  Vege: "vegetarianFriendly",
  Viandard: "meatLover",
  "URL maps": "mapUrl",
  "Moins de 10€": "lessThanTenEuros",
} as const;

type GoogleSheetsExpectedColumnNames =
  keyof typeof SHEETS_COLUMNS_TO_TECHNICAL_NAME;

function isCorrectHeader(
  header: string[]
): header is GoogleSheetsExpectedColumnNames[] {
  const expectedHeader = Object.keys(SHEETS_COLUMNS_TO_TECHNICAL_NAME);
  return header.every((col) => expectedHeader.includes(col));
}

function processBooleanFromSheetsCell(
  key: string
): key is RestaurantBooleanKeys {
  return restaurantBooleanKeys.includes(key);
}

const processBoolean = (value: string): boolean => {
  if (value === "TRUE") {
    return true;
  } else if (value === "FALSE") {
    return false;
  } else {
    throw new Error(`${value} value is not in "TRUE" or "FALSE" format`);
  }
};

const googleSheetsDtoToRestaurantInfos = (
  data: string[][]
): RestaurantInfos[] => {
  const header: string[] = data[0];
  const content = data.slice(1);
  if (isCorrectHeader(header)) {
    const jsonData = content.map((row) => {
      const restaurant: RestaurantInfos = {
        name: "Name unknown",
        canEatIn: false,
        canTakeAway: false,
        vegetarianFriendly: false,
        meatLover: false,
        mapUrl: "https://www.google.com/maps",
        lessThanTenEuros: true,
      };
      header.forEach((col, index) => {
        const key = SHEETS_COLUMNS_TO_TECHNICAL_NAME[col];
        if (processBooleanFromSheetsCell(key)) {
          restaurant[key] = processBoolean(row[index]);
        } else {
          restaurant[key] = row[index];
        }
      });

      return restaurant;
    });
    return jsonData;
  } else {
    throw new Error(`Header: ${header} is not in the correct format`);
  }
};

const generateAPIURL = (
  documentID: string | undefined,
  valuesRange: string | undefined,
  googleSheetsAPIKey: string | undefined
) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${documentID}/values/${valuesRange}?key=${googleSheetsAPIKey}`;
};

export const getAllRestaurantsSheets = async (): Promise<RestaurantInfos[]> => {
  const restaurantsTable = await (
    await fetch(
      generateAPIURL(
        RESTAURANTS_SHEET_ID,
        SHEET_VALUE_RANGE,
        GOOGLE_SHEETS_API_KEY
      ),
      { headers: { accept: "application/json" }, cache: "no-cache" }
    )
  ).json();
  const data = restaurantsTable.values;
  const restaurants = googleSheetsDtoToRestaurantInfos(data);
  return restaurants;
};
