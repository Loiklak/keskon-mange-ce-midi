"use server";

import { get } from "http";
import { emitKeypressEvents } from "readline";
import {
  RestaurantBooleanKeys,
  RestaurantInfos,
  restaurantBooleanKeys,
} from "./interface";

export const getAllRestaurantsSheets = async (): Promise<RestaurantInfos[]> => {
  if (!RESTAURANTS_SHEET_ID || !SHEET_VALUE_RANGE || !GOOGLE_SHEETS_API_KEY) {
    throw new Error(
      `documentID: ${RESTAURANTS_SHEET_ID}, valuesRange: ${SHEET_VALUE_RANGE}, googleSheetsAPIKey: ${GOOGLE_SHEETS_API_KEY} must all be defined`
    );
  }
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
  return googleSheetsDtoToRestaurantInfos(restaurantsTable.values);
};

const generateAPIURL = (
  documentID: string,
  valuesRange: string,
  googleSheetsAPIKey: string
) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${documentID}/values/${valuesRange}?key=${googleSheetsAPIKey}`;
};

const RESTAURANTS_SHEET_ID = process.env.RESTAURANTS_SHEET_ID;
const SHEET_VALUE_RANGE = process.env.SHEET_VALUE_RANGE;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const googleSheetsDtoToRestaurantInfos = (
  googleSheetsContent: string[][]
): RestaurantInfos[] => {
  const header: string[] = googleSheetsContent[0];
  const content = googleSheetsContent.slice(1);
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
        restaurantPosition: [48, 2],
      };
      header.forEach((col, index) => {
        const key = SHEETS_COLUMNS_TO_TECHNICAL_NAME[col];
        if (isBooleanFromGoogleSheetsCell(key)) {
          restaurant[key] = processBooleanFromGoogleSheetsCell(row[index]);
        } else if (key === "mapUrl") {
          restaurant.restaurantPosition = processPositionFromGoogleMapsURL(
            row[index]
          );
          restaurant[key] = row[index];
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

function isBooleanFromGoogleSheetsCell(
  key: string
): key is RestaurantBooleanKeys {
  return restaurantBooleanKeys.includes(key);
}

const processBooleanFromGoogleSheetsCell = (value: string): boolean => {
  if (value === "TRUE") {
    return true;
  } else if (value === "FALSE") {
    return false;
  } else {
    throw new Error(`${value} value is not in "TRUE" or "FALSE" format`);
  }
};

const processPositionFromGoogleMapsURL = (
  url: string | null
): [number, number] => {
  if (!url) {
    return [48, 2]; // A changer default value
  }
  const urlSplit = url.split("/");
  if (urlSplit.length < 6) {
    return [48, 2]; // A changer default value
  }
  const positionString = urlSplit[6].slice(1, -4);
  const position = positionString
    .split(",")
    .map((string) => parseFloat(string));
  console.log(position);
  if (position.length !== 2) {
    return [48, 2]; // A changer default value
  }
  return [position[0], position[1]];
};

function isCorrectHeader(
  header: string[]
): header is GoogleSheetsExpectedColumnNames[] {
  const expectedHeader = Object.keys(SHEETS_COLUMNS_TO_TECHNICAL_NAME);
  return header.every((col) => expectedHeader.includes(col));
}

type GoogleSheetsExpectedColumnNames =
  keyof typeof SHEETS_COLUMNS_TO_TECHNICAL_NAME;

const SHEETS_COLUMNS_TO_TECHNICAL_NAME = {
  Restaurant: "name",
  "Sur place": "canEatIn",
  "A emporter": "canTakeAway",
  Vege: "vegetarianFriendly",
  Viandard: "meatLover",
  "URL maps": "mapUrl",
  "Moins de 10€": "lessThanTenEuros",
} as const;
