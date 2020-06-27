import CryptoJS, { AES } from 'crypto-js';
import { EncryptionOptions } from '../decorators/encrypt';
import { getPassphrase } from '../services/passphraseService';

export const decryptValue = (
  toDecrypt: any,
  metadataForProperty: EncryptionOptions
): any => {
  const secretPassphrase = getPassphrase(metadataForProperty);

  return AES.decrypt(toDecrypt, secretPassphrase).toString(CryptoJS.enc.Utf8);
};
