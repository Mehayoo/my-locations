import { isObject } from "lodash";

export const checkIfNestedPropertyIsEmpty = (obj: any) => {
  let result = false;

  const recurse = (searchObj: any) => {
    for (const key in searchObj) {
      if (searchObj[key] === "") {
        M.toast({ html: `Please fill the ${key} field` });
        result = true;

        break;
      } else {
        if (isObject(searchObj[key])) {
          recurse(searchObj[key]);
          if (result) {
            break;
          }
        }
      }
    }
  };

  recurse(obj);

  return result;
};
