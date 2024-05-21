"use server";

import {
  ReviewInfos,
  ConvertSheetCellToEvaluation,
  isReviewInfosKey,
  Evaluation,
} from "./type/interface";
import {
  ReviewEvaluationKeys,
  reviewEvaluationKeys,
} from "./type/typeGuardEvaluation";
import { reviewStringKeys, ReviewStringKeys } from "./type/typeGuardString";
import { generateAPIURL } from "../sheetMethods";
import { error } from "console";

const REVIEW_VALUE_RANGE = "Avis!A:C";
const DOCUMENT_ID = process.env.NEXT_PUBLIC_RESTAURANTS_SHEET_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const sheetsColumnsToTechnicalName = {
  Restaurant: "name",
  Review: "comment",
  Note: "evaluation",
} as const;

type GoogleSheetsExpectedColumnNames =
  keyof typeof sheetsColumnsToTechnicalName;

function isReviewInfosHeader(
  header: string[]
): header is GoogleSheetsExpectedColumnNames[] {
  const expectedHeader = Object.keys(sheetsColumnsToTechnicalName);
  return header.every((col) => expectedHeader.includes(col));
}

function isEvaluationKey(key: string): key is ReviewEvaluationKeys {
  return reviewEvaluationKeys.includes(key);
}

function isStringKey(key: string): key is ReviewStringKeys {
  return reviewStringKeys.includes(key);
}

const arrayToReviewInfos = (data: string[][]): ReviewInfos[] => {
  const header: string[] = data[0];
  const content = data.slice(1);
  if (isReviewInfosHeader(header)) {
    const jsonData = content.map((row) => {
      const review: ReviewInfos = {
        name: "Name unknown",
        comment: "",
        evaluation: Evaluation.MEDIUM_EVALUATION,
      };
      header.forEach((col, index) => {
        const key = sheetsColumnsToTechnicalName[col];
        const cellContent = row[index];
        if (isReviewInfosKey(key)) {
          if (isEvaluationKey(key)) {
            review[key] = ConvertSheetCellToEvaluation(cellContent);
            key;
          }
          if (isStringKey(key)) {
            review[key] = cellContent;
            key;
          }
        }
      });

      return review;
    });
    return jsonData;
  } else {
    return [];
  }
};

export const getAllReviewsFromGoogleSheet = async (): Promise<
  ReviewInfos[]
> => {
  if (DOCUMENT_ID && REVIEW_VALUE_RANGE && GOOGLE_SHEETS_API_KEY) {
    const reponse = await fetch(
      generateAPIURL(DOCUMENT_ID, REVIEW_VALUE_RANGE, GOOGLE_SHEETS_API_KEY),
      { headers: { accept: "application/json" }, cache: "default" }
    );
    const reviewTable = await reponse.json();
    const data = reviewTable.values;

    const reviewInfoTable = arrayToReviewInfos(data);

    return reviewInfoTable;
  } else throw "Make sure the API parameters are coherent";
};
