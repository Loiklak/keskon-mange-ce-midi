export const REVIEW_INFOS_KEY_NAMES = {
  name : "name",
  comment : "comment",
  evaluation : "evaluation",
  author : "author"
}

export interface ReviewInfos {
  name: string;
  comment: string;
  evaluation: Evaluation | undefined;
  author: string;
}

export enum Evaluation {
  BAD_EVALUATION = "BAD_EVALUATION",
  LOW_EVALUATION = "LOW_EVALUATION",
  MEDIUM_EVALUATION = "MEDIUM_EVALUATION",
  GOOD_EVALUATION = "GOOD_EVALUATION",
  EXCELLENT_EVALUATION = "EXCELLENT_EVALUATION",
}

export function isReviewInfosKey(key: string): key is keyof ReviewInfos {
  return (
    key in REVIEW_INFOS_KEY_NAMES
  );
}

export const convertSheetCellToEvaluation = (
  CellContent: string
): Evaluation | undefined => {
  switch (CellContent) {
    case "⭐☆☆☆☆":
      return Evaluation.BAD_EVALUATION;
    case "⭐⭐☆☆☆":
      return Evaluation.LOW_EVALUATION;
    case "⭐⭐⭐☆☆":
      return Evaluation.MEDIUM_EVALUATION;
    case "⭐⭐⭐⭐☆":
      return Evaluation.GOOD_EVALUATION;
    case "⭐⭐⭐⭐⭐":
      return Evaluation.EXCELLENT_EVALUATION;
    default:
      return undefined;
  }
};

export const convertEvaluationToStringToDisplay = (
  evaluation: Evaluation | undefined
): string => {
  switch (evaluation) {
    case Evaluation.BAD_EVALUATION:
      return "⭐☆☆☆☆";
    case Evaluation.LOW_EVALUATION:
      return "⭐⭐☆☆☆";
    case Evaluation.MEDIUM_EVALUATION:
      return "⭐⭐⭐☆☆";
    case Evaluation.GOOD_EVALUATION:
      return "⭐⭐⭐⭐☆";
    case Evaluation.EXCELLENT_EVALUATION:
      return "⭐⭐⭐⭐⭐";
    default:
      return "";
  }
};
