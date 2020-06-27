import { AES } from 'crypto-js';
import { chance } from '../../chanceSetup';
import { EncryptionOptions } from '../decorators/encrypt';
import { encryptValue } from './encryptor';
import { getPassphrase } from '../services/passphraseService';

jest.mock('crypto-js');
jest.mock('../services/passphraseService');

const encryptSpy = jest.spyOn(AES, 'encrypt');
const getPassphraseMock = getPassphrase as jest.Mock;

let actual: any;
let metadataForProperty: EncryptionOptions;
let passphrase: string;
let toEncrypt: string;
let encrypted: string;
let encryptedToString: jest.Mock;

beforeEach(() => {
  metadataForProperty = {
    passphraseGenerator: chance.pickone([
      chance.string(),
      () => chance.string()
    ])
  };
  toEncrypt = chance.string();
  passphrase = chance.string();

  getPassphraseMock.mockReturnValue(passphrase);

  encrypted = chance.string();
  encryptedToString = jest.fn().mockReturnValue(encrypted);
  let encryptedObject = {
    toString: encryptedToString
  };

  // @ts-ignore
  encryptSpy.mockReturnValue(encryptedObject);

  actual = encryptValue(toEncrypt, metadataForProperty);
});

it('gets the passphrase', () => {
  expect(getPassphraseMock).toHaveBeenCalledTimes(1);
  expect(getPassphraseMock).toHaveBeenCalledWith(metadataForProperty);
});

it('encrypts the value with the passphrase', () => {
  expect(encryptSpy).toHaveBeenCalledTimes(1);
  expect(encryptSpy).toHaveBeenCalledWith(toEncrypt, passphrase);
});

it('gets the encrypted string', () => {
  expect(encryptedToString).toHaveBeenCalledTimes(1);
  expect(encryptedToString).toHaveBeenCalledWith();
});

it('returns the encrypted string', () => {
  expect(actual).toEqual(encrypted);
});
