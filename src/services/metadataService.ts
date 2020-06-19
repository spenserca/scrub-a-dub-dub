import 'reflect-metadata';
import { ScrubberOptions } from '../decorators/scrub';

const SCRUBBER_OPTIONS_METADATA_KEY = 'scrubberOptions';

export const getScrubberMetadataForProperty = (
  target: any,
  propertyKey: string
): ScrubberOptions => {
  return Reflect.getMetadata(
    SCRUBBER_OPTIONS_METADATA_KEY,
    target,
    propertyKey
  );
};

export const hasScrubberMetadata = (
  target: any,
  propertyKey: string
): boolean => {
  return Reflect.hasMetadata(
    SCRUBBER_OPTIONS_METADATA_KEY,
    target,
    propertyKey
  );
};
