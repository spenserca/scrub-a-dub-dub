import { chance } from '../../chanceSetup';
import { scrubToJSON, scrubToString } from '../scrubbers/scrubberUtils';
import { scrubbable } from './scrubbable';

jest.mock('../scrubbers/scrubberUtils');

const scrubToStringMock = scrubToString as jest.Mock;
const scrubToJSONMock = scrubToJSON as jest.Mock;

@scrubbable
class TestClass extends Object {}

describe('when getting the string value of the object', () => {
  let actual: any;
  let testClass: TestClass;
  let expected: string;

  beforeEach(() => {
    expected = chance.string();
    scrubToStringMock.mockReturnValue(expected);

    testClass = new TestClass();
    actual = testClass.toString();
  });

  it('gets the string representation of the object', () => {
    expect(scrubToStringMock).toHaveBeenCalledTimes(1);
    expect(scrubToStringMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the string representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});

describe('when getting the json value of the object', () => {
  let actual: any;
  let testClass: TestClass;
  let expected: any;

  beforeEach(() => {
    expected = { [chance.string()]: chance.string() };
    scrubToJSONMock.mockReturnValue(expected);

    testClass = new TestClass();
    // @ts-ignore
    actual = testClass.toJSON();
  });

  it('gets the string representation of the object', () => {
    expect(scrubToJSONMock).toHaveBeenCalledTimes(1);
    expect(scrubToJSONMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the string representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});
