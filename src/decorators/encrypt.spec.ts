import { chance } from '../../chanceSetup';
import { encrypt } from './encrypt';

jest.mock('reflect-metadata');

const metadataSpy = jest.spyOn(Reflect, 'metadata');

let actual: any;
let options: any;

beforeEach(() => {
  const passphrase = chance.string();
  options = { passphrase };

  actual = encrypt(options);
});

it('sets the encryption options metadata', () => {
  expect(metadataSpy).toHaveBeenCalledTimes(1);
  expect(metadataSpy).toHaveBeenCalledWith('encryptionOptions', options);
});
