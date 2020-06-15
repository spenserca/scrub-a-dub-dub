import 'reflect-metadata';

export const getScrubberMetadataForProperty = (target: any, propertyKey: string) => {
  const SCRUBBER_OPTIONS_METADATA_KEY = 'scrubberOptions';
  return Reflect.getMetadata(SCRUBBER_OPTIONS_METADATA_KEY, target, propertyKey);
};
