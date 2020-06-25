export const isObjectWithKeys = (value: any): boolean =>
  typeof value === 'object' && Object.keys(value as object).length !== 0;
