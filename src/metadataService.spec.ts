import 'reflect-metadata';
import { chance } from '../chanceSetup';
import {
  getScrubberMetadataForProperty,
  hasScrubberMetadata
} from './metadataService';

jest.mock('reflect-metadata');

const getMetadataSpy = jest.spyOn(Reflect, 'getMetadata');
const hasMetadataSpy = jest.spyOn(Reflect, 'hasMetadata');

const SCRUBBER_OPTIONS_METADATA_KEY = 'scrubberOptions';
let actual: any;
let target: any;
let propertyKey: string;
let expected: any;

beforeEach(() => {
  jest.resetAllMocks();

  propertyKey = chance.string();
  target = { [propertyKey]: chance.string() };
});

describe('getting scrubber metadata for a property', () => {
  beforeEach(() => {
    expected = { [chance.string()]: chance.string() };

    getMetadataSpy.mockReturnValue(expected);

    actual = getScrubberMetadataForProperty(target, propertyKey);
  });

  it('gets the scrubber metadata for the property', () => {
    expect(getMetadataSpy).toHaveBeenCalledTimes(1);
    expect(getMetadataSpy).toHaveBeenCalledWith(
      SCRUBBER_OPTIONS_METADATA_KEY,
      target,
      propertyKey
    );
  });

  it('returns the scrubber options metadata', () => {
    expect(actual).toBe(expected);
  });
});

describe('checking to see if a property has metadata', () => {
  beforeEach(() => {
    expected = chance.bool();

    hasMetadataSpy.mockReturnValue(expected);

    actual = hasScrubberMetadata(target, propertyKey);
  });

  it('checks to see if the property has scrubber metadata', () => {
    expect(hasMetadataSpy).toHaveBeenCalledTimes(1);
    expect(hasMetadataSpy).toHaveBeenCalledWith(
      SCRUBBER_OPTIONS_METADATA_KEY,
      target,
      propertyKey
    );
  });

  it('returns whether the property has scrubber metadata or not', () => {
    expect(actual).toEqual(expected);
  });
});
