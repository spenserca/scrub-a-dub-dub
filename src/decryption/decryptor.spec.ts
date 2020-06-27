import CryptoJS, { AES } from 'crypto-js';
import { chance } from '../../chanceSetup';
import { EncryptionOptions } from '../decorators/encrypt';
import { decryptValue } from './decryptor';
import { getPassphrase } from '../services/passphraseService';

jest.mock('crypto-js');
jest.mock('../services/passphraseService');

const decryptSpy = jest.spyOn(AES, 'decrypt');
const getPassphraseMock = getPassphrase as jest.Mock;

let actual: any;
let metadataForProperty: EncryptionOptions;
let decrypted: string;
let decryptedToString: jest.Mock;
let toDecrypt: string;
let passphrase: string;

beforeEach(() => {
  metadataForProperty = {
    passphraseGenerator: chance.pickone([
      chance.string(),
      () => chance.string()
    ])
  };
  passphrase = chance.string();

  getPassphraseMock.mockReturnValue(passphrase);

  toDecrypt = chance.string();
  decrypted = chance.string();
  decryptedToString = jest.fn().mockReturnValue(decrypted);
  let decryptedObject = {
    toString: decryptedToString
  };

  // @ts-ignore
  decryptSpy.mockReturnValue(decryptedObject);

  actual = decryptValue(toDecrypt, metadataForProperty);
});

it('gets the passphrase', () => {
  expect(getPassphraseMock).toHaveBeenCalledTimes(1);
  expect(getPassphraseMock).toHaveBeenCalledWith(metadataForProperty);
});

it('decrypts the value with the passphrase', () => {
  expect(decryptSpy).toHaveBeenCalledTimes(1);
  expect(decryptSpy).toHaveBeenCalledWith(toDecrypt, passphrase);
});

it('gets the decrypted string', () => {
  expect(decryptedToString).toHaveBeenCalledTimes(1);
  expect(decryptedToString).toHaveBeenCalledWith(CryptoJS.enc.Utf8);
});

it('returns the decrypted string', () => {
  expect(actual).toEqual(decrypted);
});
