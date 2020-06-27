import { EncryptionOptions } from '../decorators/encrypt';
import { isObjectWithKeys } from '../filters/objectFilter';
import {
  getMetadataForProperty,
  hasMetadata
} from '../services/metadataService';
import { encryptValue } from './encryptor';

const ENCRYPTION_OPTIONS_METADATA_KEY = 'encryptionOptions';

export const encryptObject = <T>(toEncrypt: any): T => {
  const encrypted = Object.entries(toEncrypt).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = encryptObject(value);
      } else if (hasMetadata(toEncrypt, key, ENCRYPTION_OPTIONS_METADATA_KEY)) {
        const metadataForProperty = getMetadataForProperty<EncryptionOptions>(
          toEncrypt,
          key,
          ENCRYPTION_OPTIONS_METADATA_KEY
        );
        scrubbedValues[key] = encryptValue(toEncrypt[key], metadataForProperty);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toEncrypt, ...encrypted };
};
