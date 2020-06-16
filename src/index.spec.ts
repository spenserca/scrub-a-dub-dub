import { when } from 'jest-when';
import 'reflect-metadata';
import { chance } from '../chanceSetup';
import { scrub } from './decorators/scrub';
import { scrubObject } from './index';
import { scrubString } from './scrubbers/stringScrubber';

jest.mock('reflect-metadata');
jest.mock('./scrubbers/stringScrubber');

const hasMetadataSpy = jest.spyOn(Reflect, 'hasMetadata');
const scrubStringMock = scrubString as jest.Mock;

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

const SCRUBBER_OPTIONS_METADATA_KEY = 'scrubberOptions';
let actual: TestClass;
let expectedPropertyOne: string;
let expectedScrubbedString: string;
let toScrub: TestClass;

beforeEach(() => {
  expectedPropertyOne = chance.string();
  let actualPropertyToScrub = chance.string();

  toScrub = new TestClass(expectedPropertyOne, actualPropertyToScrub);

  expectedScrubbedString = chance.string();
  scrubStringMock.mockReturnValue(expectedScrubbedString);

  when(hasMetadataSpy)
    .calledWith(SCRUBBER_OPTIONS_METADATA_KEY, toScrub, 'propertyOne')
    .mockReturnValue(false);

  when(hasMetadataSpy)
    .calledWith(SCRUBBER_OPTIONS_METADATA_KEY, toScrub, 'stringToScrub')
    .mockReturnValue(true);

  actual = scrubObject(toScrub);
});

it('checks to see if the property has scrubber metadata', () => {
  expect(hasMetadataSpy).toHaveBeenCalledTimes(Object.keys(toScrub).length);
  Object.keys(toScrub).forEach((key: string) => {
    expect(hasMetadataSpy).toHaveBeenCalledWith(
      SCRUBBER_OPTIONS_METADATA_KEY,
      toScrub,
      key
    );
  });
});

describe('when a property does not need to be scrubbed', () => {
  it(`does not get the scrubbed value`, () => {
    objectKeysNotToScrub.forEach((key: string) => {
      // @ts-ignore
      expect(scrubStringMock).not.toHaveBeenCalledWith(toScrub[key]);
    });
  });

  it('does not change the property value', () => {
    objectKeysNotToScrub.forEach((key: string) => {
      // @ts-ignore
      expect(actual[key]).toEqual(toScrub[key]);
    });
  });
});

describe('when a property needs to be scrubbed', () => {
  it.todo('gets the scrubber metadata');

  it('gets the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      // @ts-ignore
      expect(scrubStringMock).toHaveBeenCalledWith(toScrub[key]);
    });
  });

  it('changes the property value to the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      // @ts-ignore
      expect(actual[key]).toEqual(expectedScrubbedString);
    });
  });
});
