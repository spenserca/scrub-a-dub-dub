import {
  getScrubberMetadataForProperty,
  hasScrubberMetadata
} from '../services/metadataService';
import { scrubValue } from './scrubber';

const isObjectWithKeys = (value: any): boolean =>
  typeof value === 'object' && Object.keys(value as object).length !== 0;

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.entries(toScrub).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = scrubObject(value);
      } else if (hasScrubberMetadata(toScrub, key)) {
        const metadataForProperty = getScrubberMetadataForProperty(
          toScrub,
          key
        );
        scrubbedValues[key] = scrubValue(toScrub[key], metadataForProperty);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
