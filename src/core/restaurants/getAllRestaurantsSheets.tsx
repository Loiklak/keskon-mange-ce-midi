"use server";

import { get } from "http";
import { emitKeypressEvents } from "readline";

const documentID = "1B1kD-kZQiJUEYcSmAXom_lY7_JhOLp9UTq0Uf44wNY0"
const valuesRange = "Feuille1!A1:E3"
const googleSheetsAPIKey = "AIzaSyCfYXtdNhpPqpSmdNROsXe99yK75o9vcCM"

interface RestaurantInfos {
  name: string;
  canEatIn: boolean;
  canTakeAway: boolean;
  vegetarianFriendly: boolean;
  meatLover: boolean;
}

enum sheetsColumnsToTechnicalName {
  "Restaurant" = "name",
  "Sur place" = "canEatIn",
  "A emporter" = "canTakeAway",
  "Vege" = "vegetarianFriendly",
  "Viandard" = "meatLover"
}
type CorrectColumn = keyof typeof sheetsColumnsToTechnicalName

// Correct header type guard
function isCorrectHeader(header: string[]): header is CorrectColumn[] {
  const expectedHeader = Object.keys(sheetsColumnsToTechnicalName)
  return header.every(col => expectedHeader.includes(col))
}

const processBoolean = (value: string): boolean => {
  if (value === 'TRUE'){return true}
  else if (value === 'FALSE'){return false}
  else {throw new Error('Value is not a boolean')}
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
      };
      header.forEach((col, index) => {
        // case disjunction: value = string or value = boolean
        // -> for strings
        if (col==="Restaurant"){restaurant[sheetsColumnsToTechnicalName[col]] = row[index]}
        // -> for booleans
        else{restaurant[sheetsColumnsToTechnicalName[col]] = processBoolean(row[index])}
      });
      return restaurant;
        
    });
    return jsonData
  }else{return []}
}


const generateAPIURL = (documentID: string, valuesRange: string, googleSheetsAPIKey: string) => {
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