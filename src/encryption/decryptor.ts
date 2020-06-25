import CryptoJS, { AES } from 'crypto-js';
import { EncryptionOptions } from '../decorators/encrypt';

export const decryptValue = (
  toDecrypt: any,
  metadataForProperty: EncryptionOptions
): any => {
  const secretPassphrase = metadataForProperty.passphrase;
  return AES.decrypt(toDecrypt, secretPassphrase).toString(CryptoJS.enc.Utf8);
};
