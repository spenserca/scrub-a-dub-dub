import { when } from 'jest-when';
import { chance } from '../../chanceSetup';
import { scrub } from '../decorators/scrub';
import { hasScrubberMetadata } from '../metadataService';
import { scrubObject } from './objectScrubber';
import { scrubValue } from './scrubber';

jest.mock('./scrubber');
jest.mock('../metadataService');

const scrubValueMock = scrubValue as jest.Mock;
const hasScrubberMetadataMock = hasScrubberMetadata as jest.Mock;

class TestClass {
  stringNotToScrub: string;

  @scrub()
  stringToScrub: string;

  constructor (one: string, two: string) {
    this.stringNotToScrub = one;
    this.stringToScrub = two;
  }
}

const objectKeysNotToScrub = ['stringNotToScrub'];

const objectKeysToScrub = ['stringToScrub'];

let actual: TestClass & { [key: string]: any };
let expectedPropertyOne: string;
let expectedScrubbedString: string;
let toScrub: TestClass & { [key: string]: any };

beforeEach(() => {
  expectedPropertyOne = chance.string();
  let actualPropertyToScrub = chance.string();

  toScrub = new TestClass(expectedPropertyOne, actualPropertyToScrub);

  expectedScrubbedString = chance.string();
  scrubValueMock.mockReturnValue(expectedScrubbedString);

  when(hasScrubberMetadataMock)
    .calledWith(toScrub, 'propertyOne')
    .mockReturnValue(false);

  when(hasScrubberMetadataMock)
    .calledWith(toScrub, 'stringToScrub')
    .mockReturnValue(true);

  actual = scrubObject(toScrub);
});

it('checks to see if the property has scrubber metadata', () => {
  expect(hasScrubberMetadataMock).toHaveBeenCalledTimes(
    Object.keys(toScrub).length
  );
  Object.keys(toScrub).forEach((key: string) => {
    expect(hasScrubberMetadataMock).toHaveBeenCalledWith(toScrub, key);
  });
});

describe('when a property does not need to be scrubbed', () => {
  it(`does not get the scrubbed value`, () => {
    objectKeysNotToScrub.forEach((key: string) => {
      expect(scrubValueMock).not.toHaveBeenCalledWith(toScrub[key]);
    });
  });

  it('does not change the property value', () => {
    objectKeysNotToScrub.forEach((key: string) => {
      expect(actual[key]).toEqual(toScrub[key]);
    });
  });
});

describe('when a property needs to be scrubbed', () => {
  it.todo('gets the scrubber metadata');

  it('gets the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      expect(scrubValueMock).toHaveBeenCalledWith(toScrub[key]);
    });
  });

  it('changes the property value to the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      expect(actual[key]).toEqual(expectedScrubbedString);
    });
  });
});
