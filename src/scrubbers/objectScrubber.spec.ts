import { when } from 'jest-when';
import { scrub } from '..';
import { chance } from '../../chanceSetup';
import {
  getMetadataForProperty,
  hasMetadata
} from '../services/metadataService';
import { scrubObject } from './objectScrubber';
import { scrubValue } from './scrubber';

jest.mock('./scrubber');
jest.mock('../services/metadataService');

const scrubValueMock = scrubValue as jest.Mock;
const hasMetadataMock = hasMetadata as jest.Mock;
const getMetadataForPropertyMock = getMetadataForProperty as jest.Mock;

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
let propertyMetadata: any;

beforeEach(() => {
  expectedPropertyOne = chance.string();
  let actualPropertyToScrub = chance.string();

  toScrub = new TestClass(expectedPropertyOne, actualPropertyToScrub);

  expectedScrubbedString = chance.string();
  scrubValueMock.mockReturnValue(expectedScrubbedString);

  when(hasMetadataMock)
    .calledWith(toScrub, 'propertyOne')
    .mockReturnValue(false);

  when(hasMetadataMock)
    .calledWith(toScrub, 'stringToScrub')
    .mockReturnValue(true);

  propertyMetadata = { [chance.string()]: chance.string() };
  getMetadataForPropertyMock.mockReturnValue(propertyMetadata);

  actual = scrubObject(toScrub);
});

it('checks to see if the property has scrubber metadata', () => {
  expect(hasMetadataMock).toHaveBeenCalledTimes(Object.keys(toScrub).length);
  Object.keys(toScrub).forEach((key: string) => {
    expect(hasMetadataMock).toHaveBeenCalledWith(
      toScrub,
      key,
      'scrubberOptions'
    );
  });
});

describe('when a property does not have scrubber metadata', () => {
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

describe('when a property has scrubber metadata', () => {
  it('gets the scrubber metadata', () => {
    expect(getMetadataForPropertyMock).toHaveBeenCalledTimes(1);
    objectKeysToScrub.forEach((key: string) => {
      expect(getMetadataForPropertyMock).toHaveBeenCalledWith(
        toScrub,
        key,
        'scrubberOptions'
      );
    });
  });

  it('gets the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      expect(scrubValueMock).toHaveBeenCalledWith(
        toScrub[key],
        propertyMetadata
      );
    });
  });

  it('changes the property value to the scrubbed value', () => {
    objectKeysToScrub.forEach((key: string) => {
      expect(actual[key]).toEqual(expectedScrubbedString);
    });
  });
});
