export const generateAPIURL = (
  documentID: string,
  valuesRange: string,
  googleSheetsAPIKey: string
) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${documentID}/values/${valuesRange}?key=${googleSheetsAPIKey}`;
};
