import { chance } from '../../chanceSetup';
import { encryptToJSON, encryptToString } from './encryptorUtils';
import { encryptObject } from './objectEncryptor';

jest.mock('./objectEncryptor');

const encryptObjectMock = encryptObject as jest.Mock;

describe('encrypting to a string', () => {
  let actual: any;
  let toEncrypt: any;
  let expected: string;

  beforeEach(() => {
    toEncrypt = { [chance.string()]: chance.string() };
    expected = `{\"${chance.string()}\":\"${chance.string()}\"}`;
    let encrypted = JSON.parse(expected);

    encryptObjectMock.mockReturnValue(encrypted);

    actual = encryptToString(toEncrypt);
  });

  it('gets the encrypted object', () => {
    expect(encryptObjectMock).toHaveBeenCalledTimes(1);
    expect(encryptObjectMock).toHaveBeenCalledWith(toEncrypt);
  });

  it('returns the encrypted object as its string representation', () => {
    expect(actual).toEqual(expected);
  });
});

describe('encrypting to an object', () => {
  let actual: any;
  let toEncrypt: any;
  let expected: any;

  beforeEach(() => {
    toEncrypt = { [chance.string()]: chance.string() };
    expected = { [chance.string()]: chance.string() };

    encryptObjectMock.mockReturnValue(expected);

    actual = encryptToJSON(toEncrypt);
  });

  it('gets the encrypted object', () => {
    expect(encryptObjectMock).toHaveBeenCalledTimes(1);
    expect(encryptObjectMock).toHaveBeenCalledWith(toEncrypt);
  });

  it('returns the object with encrypted properties', () => {
    expect(actual).toEqual(expected);
  });
});
