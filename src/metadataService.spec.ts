import 'reflect-metadata';
import { chance } from '../chanceSetup';
import { getScrubberMetadataForProperty } from './metadataService';

jest.mock('reflect-metadata');

const getMetadataSpy = jest.spyOn(Reflect, 'getMetadata');

let actual: any;
let target: any;
let propertyKey: string;
let expected: any;

beforeEach(() => {
  jest.resetAllMocks();

  propertyKey = chance.string();
  target = { [propertyKey]: chance.string() };
  expected = { [chance.string()]: chance.string() };

  getMetadataSpy.mockReturnValue(expected);

  actual = getScrubberMetadataForProperty(target, propertyKey);
});

it('gets the scrubber metadata for the property', () => {
  expect(getMetadataSpy).toHaveBeenCalledTimes(1);
  expect(getMetadataSpy).toHaveBeenCalledWith(
    'scrubberOptions',
    target,
    propertyKey
  );
});

it('returns the scrubber options metadata', () => {
  expect(actual).toBe(expected);
});
