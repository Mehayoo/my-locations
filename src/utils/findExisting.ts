import { find as loadashFind } from "lodash";

export const findExisting = (
  searchArr: any[],
  propName: string,
  propValue: string
) => {
  return loadashFind(searchArr, { [propName]: propValue });
};
