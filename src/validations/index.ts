/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  value === NaN ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value === '') ||
  (Array.isArray(value) && value.length === 0);

export const isNumeric = (num: any) => {
  return !isNaN(num);
};
