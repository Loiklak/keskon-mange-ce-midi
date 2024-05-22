export interface ReviewInfos {
  name: string;
  comment: string;
  evaluation: Evaluation | undefined;
  author: string;
}

export enum Evaluation {
  BAD_EVALUATION = "BAD_EVALUATION",
  MEDIUM_EVALUATION = "MEDIUM_EVALUATION",
  GOOD_EVALUATION = "GOOD_EVALUATION",
}

export function isReviewInfosKey(key: string): key is keyof ReviewInfos {
  return (
    key === "name" ||
    key === "comment" ||
    key === "evaluation" ||
    key == "author"
  );
}

export const convertSheetCellToEvaluation = (
  CellContent: string
): Evaluation | undefined => {
  switch (CellContent) {
    case "⭐☆☆":
      return Evaluation.BAD_EVALUATION;
    case "⭐⭐☆":
      return Evaluation.MEDIUM_EVALUATION;
    case "⭐⭐⭐":
      return Evaluation.GOOD_EVALUATION;
    default:
      return undefined;
  }
};
