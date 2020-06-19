import {
  getScrubberMetadataForProperty,
  hasScrubberMetadata
} from '../services/metadataService';
import { scrubValue } from './scrubber';

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.entries(toScrub).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (hasScrubberMetadata(toScrub, key)) {
        const metadataForProperty = getScrubberMetadataForProperty(
          toScrub,
          key
        );
        scrubbedValues[key] = scrubValue(toScrub[key], metadataForProperty);
      } else if (
        typeof value === 'object' &&
        Object.keys(value as object).length !== 0
      ) {
        scrubbedValues[key] = scrubObject(value);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
