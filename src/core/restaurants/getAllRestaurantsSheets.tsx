"use server";

import { get } from "http";
import { emitKeypressEvents } from "readline";
import { RestaurantBooleanKeys, RestaurantInfos, restaurantBooleanKeys } from "./interface";

const documentID = process.env.RESTAURANTS_SHEET_ID
const valuesRange = process.env.SHEET_VALUE_RANGE
const googleSheetsAPIKey = process.env.GOOGLE_SHEETS_API_KEY

const sheetsColumnsToTechnicalName = {
  Restaurant: 'name',
  'Sur place': 'canEatIn',
  'A emporter': 'canTakeAway',
  Vege: 'vegetarianFriendly',
  Viandard : 'meatLover',
  "URL maps": "mapUrl",
  "Moins de 10€": "lessThanTenEuros"
} as const

type GoogleSheetsExpectedColumnNames = keyof typeof sheetsColumnsToTechnicalName

// Correct header type guard
function isCorrectHeader(header: string[]): header is GoogleSheetsExpectedColumnNames[] {
  const expectedHeader = Object.keys(sheetsColumnsToTechnicalName)
  return header.every(col => expectedHeader.includes(col))
}

// Boolean key type guard
function isBooleanKey(key: string): key is RestaurantBooleanKeys {
  return restaurantBooleanKeys.includes(key)
}


const processBoolean = (value: string): boolean => {
  if (value === 'TRUE'){return true}
  else if (value === 'FALSE'){return false}
  else {throw new Error('Value is not in "TRUE" or "FALSE" format')}
}

const arrayToRestaurantInfos = (data: string[][]): RestaurantInfos[] => {
  // Extraire les en-têtes (première ligne) et vérifie le type
  // type CorrectHeader = 'Restaurant' | 'Sur place' | 'A emporter' | 'Vege' | 'Viandard';
  const header: string[] = data[0];
  const content = data.slice(1);
  if (isCorrectHeader(header)){

    // Convertir les données en JSON
    const jsonData = content.map(row => {
      const restaurant: RestaurantInfos = {
        name: 'Name unknown',
        canEatIn: false,
        canTakeAway: false,
        vegetarianFriendly: false,
        meatLover: false,
        mapUrl: "https://www.google.com/maps",
        lessThanTenEuros: true,
      };
      header.forEach((col, index) => {
        // case disjunction: value = string or value = boolean
        const key = sheetsColumnsToTechnicalName[col]
        if (isBooleanKey(key)){
          restaurant[key] = processBoolean(row[index])
        }
        else{restaurant[key] = row[index]}
      });

      return restaurant;
        
    });
    return jsonData
  }else{return []}
}


const generateAPIURL = (documentID: string|undefined, valuesRange: string|undefined, googleSheetsAPIKey: string|undefined) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${documentID}/values/${valuesRange}?key=${googleSheetsAPIKey}`
}

export const getAllRestaurantsSheets = async (): Promise<RestaurantInfos[]> => {
  const RestaurantsTable = await fetch(generateAPIURL(documentID, valuesRange, googleSheetsAPIKey), { headers: { accept: "application/json" }, cache: 'no-cache'}).then(
    response => response.json(),
  )
  const data = RestaurantsTable.values
  const restaurants = arrayToRestaurantInfos(data)
  return restaurants
}