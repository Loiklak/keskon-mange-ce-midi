import { ReviewInfos, Evaluation } from "./interface";

export type ReviewEvaluationKeys = keyof {
  [Key in keyof ReviewInfos as ReviewInfos[Key] extends Evaluation | undefined
    ? Key
    : never]: never;
};
const objectEvaluationKeys: Record<ReviewEvaluationKeys, undefined> = {
  evaluation: undefined,
};
export const reviewEvaluationKeys = Object.keys(objectEvaluationKeys);
