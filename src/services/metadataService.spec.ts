import 'reflect-metadata';
import { chance } from '../../chanceSetup';
import { getMetadataForProperty, hasMetadata } from './metadataService';

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

describe('getting metadata for a property', () => {
  let metadataKey: string;

  beforeEach(() => {
    expected = { [chance.string()]: chance.string() };
    metadataKey = chance.string();

    getMetadataSpy.mockReturnValue(expected);

    actual = getMetadataForProperty(target, propertyKey, metadataKey);
  });

  it('gets the metadata for the property', () => {
    expect(getMetadataSpy).toHaveBeenCalledTimes(1);
    expect(getMetadataSpy).toHaveBeenCalledWith(
      metadataKey,
      target,
      propertyKey
    );
  });

  it('returns the metadata object', () => {
    expect(actual).toBe(expected);
  });
});

describe('checking to see if a property has metadata', () => {
  let metadataKey: string;

  beforeEach(() => {
    expected = chance.bool();
    metadataKey = chance.string();

    hasMetadataSpy.mockReturnValue(expected);

    actual = hasMetadata(target, propertyKey, metadataKey);
  });

  it('checks to see if the property has scrubber metadata', () => {
    expect(hasMetadataSpy).toHaveBeenCalledTimes(1);
    expect(hasMetadataSpy).toHaveBeenCalledWith(
      metadataKey,
      target,
      propertyKey
    );
  });

  it('returns whether the property has scrubber metadata or not', () => {
    expect(actual).toEqual(expected);
  });
});
