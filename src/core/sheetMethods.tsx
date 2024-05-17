export const generateAPIURL = (
  documentID: string,
  valuesRange: string,
  googleSheetsAPIKey: string
) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${documentID}/values/${valuesRange}?key=${googleSheetsAPIKey}`;
};

export async function getDataFromCacheOrSheet<TData>(
  localDataName: string,
  getDataFromSheet: () => Promise<TData>
) {
  if (typeof window !== "undefined") {
    const cachedData = localStorage.getItem(localDataName);
    if (cachedData) {
      return JSON.parse(cachedData) as TData;
    } else {
      const dataFromSheet = await getDataFromSheet();
      localStorage.setItem(localDataName, JSON.stringify(dataFromSheet));
      return dataFromSheet;
    }
  } else {
    return await getDataFromSheet();
  }
}
