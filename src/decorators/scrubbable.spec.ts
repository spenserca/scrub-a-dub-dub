import { chance } from '../../chanceSetup';
import { scrubToJSON, scrubToString } from '../scrubbers/scrubberUtils';
import { scrubbable } from './scrubbable';

jest.mock('../scrubbers/scrubberUtils');

const scrubToStringMock = scrubToString as jest.Mock;
const scrubToJSONMock = scrubToJSON as jest.Mock;

@scrubbable
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
    scrubToStringMock.mockReturnValue(expected);

    actual = testClass.toString();
  });

  it('gets the scrubbed string representation of the object', () => {
    expect(scrubToStringMock).toHaveBeenCalledTimes(1);
    expect(scrubToStringMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the scrubbed string representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});

describe('when getting the json value of the object', () => {
  let actual: any;
  let expected: any;

  beforeEach(() => {
    expected = { [chance.string()]: chance.string() };
    scrubToJSONMock.mockReturnValue(expected);

    actual = testClass.toJSON();
  });

  it('gets the scrubbed string representation of the object', () => {
    expect(scrubToJSONMock).toHaveBeenCalledTimes(1);
    expect(scrubToJSONMock).toHaveBeenCalledWith(testClass);
  });

  it('returns the scrubbed json representation of the object', () => {
    expect(actual).toEqual(expected);
  });
});
