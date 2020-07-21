import { Indexable } from '../../index';
import { EncryptionOptions } from '../decorators/encrypt';
import { isObjectWithKeys } from '../filters/objectFilter';
import {
  getMetadataForProperty,
  hasMetadata
} from '../services/metadataService';
import { encryptValue } from './encryptor';

const ENCRYPTION_OPTIONS_METADATA_KEY = 'encryptionOptions';

export const encryptObject = <T extends Indexable>(
  constructor: new (args: T) => T,
  toEncrypt: T
): T => {
  const encrypted = Object.entries(toEncrypt).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = encryptObject(value.constructor, value);
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

  let newValue = { ...toEncrypt, ...encrypted };
  return new constructor(newValue);
};
