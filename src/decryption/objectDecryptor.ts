import { Indexable } from '../../index';
import { EncryptionOptions } from '../decorators/encrypt';
import { isObjectWithKeys } from '../filters/objectFilter';
import {
  getMetadataForProperty,
  hasMetadata
} from '../services/metadataService';
import { decryptValue } from './decryptor';

const ENCRYPTION_OPTIONS_METADATA_KEY = 'encryptionOptions';

export const decryptObject = <T extends Indexable>(
  constructor: new (args: T) => T,
  toDecrypt: T
): T => {
  const decrypted = Object.entries(toDecrypt).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = decryptObject(value.constructor, value);
      } else if (hasMetadata(toDecrypt, key, ENCRYPTION_OPTIONS_METADATA_KEY)) {
        const metadataForProperty = getMetadataForProperty<EncryptionOptions>(
          toDecrypt,
          key,
          ENCRYPTION_OPTIONS_METADATA_KEY
        );
        scrubbedValues[key] = decryptValue(toDecrypt[key], metadataForProperty);
      }

      return scrubbedValues;
    },
    {}
  );

  let newValue = { ...toDecrypt, ...decrypted };
  return new constructor(newValue);
};
