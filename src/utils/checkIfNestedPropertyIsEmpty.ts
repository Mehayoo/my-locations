import { isObject } from "lodash";

export const checkIfNestedPropertyIsEmpty = (obj: any) => {
  let result = false;

  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      checkIfNestedPropertyIsEmpty(obj[key]);
    } else if (obj[key] === "") {
      M.toast({ html: `Please fill the ${key} field` });
      result = true;
    }
  });

  return result;
};
