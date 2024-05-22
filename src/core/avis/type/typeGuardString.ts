import { ReviewInfos } from "./interface";

export type ReviewStringKeys = keyof {
  [Key in keyof ReviewInfos as ReviewInfos[Key] extends String
    ? Key
    : never]: never;
};
const objectStringKeys: Record<ReviewStringKeys, undefined> = {
  name: undefined,
  comment: undefined,
  author: undefined,
};
export const reviewStringKeys = Object.keys(objectStringKeys);
