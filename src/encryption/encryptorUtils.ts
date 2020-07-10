import { encryptObject } from './objectEncryptor';

export const encryptToString = (toEncrypt: any): string => {
  return JSON.stringify(encryptObject(toEncrypt));
};

export const encryptToJSON = (toEncrypt: any): any => {
  return encryptObject(toEncrypt);
};
