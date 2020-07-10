import { chance } from '../../chanceSetup';
import { encryptToJSON, encryptToString } from '../encryption/encryptorUtils';
import { encryptable } from './encryptable';

jest.mock('../encryption/encryptorUtils');

const encryptToStringMock = encryptToString as jest.Mock;
const encryptToJSONMock = encryptToJSON as jest.Mock;

@encryptable
class TestClass extends Object {}

let testClass: any;

beforeEach(() => {
  testClass = new TestClass();
});

describe('when getting the string value of the object', () => {
  let actual: any;
  let expected: string;

  beforeEach(() => {
    expected = chance.string();
    encryptToStringMock.mockReturnValue(expected);

    actual = testClass.toString();
  });

  it('gets the encrypted string representation of the object', () => {
    expect(encryptToStringMock).toHaveBeenCalledTimes(1);
    expect(encryptToStringMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the encrypted string representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});

describe('when getting the json value of the object', () => {
  let actual: any;
  let expected: any;

  beforeEach(() => {
    expected = { [chance.string()]: chance.string() };
    encryptToJSONMock.mockReturnValue(expected);

    actual = testClass.toJSON();
  });

  it('gets the encrypted json representation of the mock', () => {
    expect(encryptToJSONMock).toHaveBeenCalledTimes(1);
    expect(encryptToJSONMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the encrypted json representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});
