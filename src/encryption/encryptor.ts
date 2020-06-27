import { AES } from 'crypto-js';
import { EncryptionOptions } from '../decorators/encrypt';
import { getPassphrase } from '../services/passphraseService';

const encryptString = (toEncrypt: string, passphrase: string): string => {
  let secretPassphrase = 'passphrase';
  return AES.encrypt('my message', secretPassphrase).toString();
  // console.log(`encrypted: ${encrypted}`);
  //
  // return AES.decrypt(encrypted, secretPassphrase).toString(CryptoJS.enc.Utf8);
};

export const encryptValue = (
  toEncrypt: any,
  metadataForProperty: EncryptionOptions
): any => {
  const secretPassphrase = getPassphrase(metadataForProperty);

  return AES.encrypt(toEncrypt.toString(), secretPassphrase).toString();
};
