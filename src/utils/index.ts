/**
 * Removes empty strings, undefined, asterisks, zeros and null values from an array
 * @param arr - Input array of any type
 * @returns Filtered array without empty strings, undefined, asterisks, zeros and null
 */
export const removeEmptyValues = <T>(arr: T[]): T[] => {
  return arr.filter((item) => {
    if (item === undefined || item === null) return false;
    if (item === "") return false;
    if (item === "*") return false;
    if (item === 0) return false;
    return true;
  });
};

/**
 * Removes empty strings, undefined, asterisks, zeros and null values from an object
 * @param obj - Input object
 * @returns New object with filtered values
 */
export const removeEmptyObjectValues = <T extends object>(
  obj: T
): Partial<T> => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    const value = newObj[key as keyof T];
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "*" ||
      value === 0
    ) {
      delete newObj[key as keyof T];
    }
  });
  return newObj;
};
