import {
  getEncryptionMetadataForProperty,
  hasEncryptionMetadata
} from '../services/metadataService';
import { encryptValue } from './encryptor';

const isObjectWithKeys = (value: any): boolean =>
  typeof value === 'object' && Object.keys(value as object).length !== 0;

export const encryptObject = (toEncrypt: any) => {
  const encrypted = Object.entries(toEncrypt).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = encryptObject(value);
      } else if (hasEncryptionMetadata(toEncrypt, key)) {
        const metadataForProperty = getEncryptionMetadataForProperty(
          toEncrypt,
          key
        );
        scrubbedValues[key] = encryptValue(toEncrypt[key], metadataForProperty);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toEncrypt, ...encrypted };
};
