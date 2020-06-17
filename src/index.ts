import { hasScrubberMetadata } from './metadataService';
import { scrubValue } from './scrubbers/scrubber';

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.keys(toScrub).reduce(
    (scrubbedValues: any, key: string) => {
      if (hasScrubberMetadata(toScrub, key)) {
        scrubbedValues[key] = scrubValue(toScrub[key]);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
