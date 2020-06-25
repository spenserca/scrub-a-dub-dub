import { ScrubberOptions } from '../decorators/scrub';
import { isObjectWithKeys } from '../filters/objectFilter';
import {
  getMetadataForProperty,
  hasMetadata
} from '../services/metadataService';
import { scrubValue } from './scrubber';

const SCRUBBER_OPTIONS_METADATA_KEY = 'scrubberOptions';

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.entries(toScrub).reduce(
    (scrubbedValues: any, [key, value]) => {
      if (isObjectWithKeys(value)) {
        scrubbedValues[key] = scrubObject(value);
      } else if (hasMetadata(toScrub, key, SCRUBBER_OPTIONS_METADATA_KEY)) {
        const metadataForProperty = getMetadataForProperty<ScrubberOptions>(
          toScrub,
          key,
          SCRUBBER_OPTIONS_METADATA_KEY
        );
        scrubbedValues[key] = scrubValue(toScrub[key], metadataForProperty);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
