import { hasScrubberMetadata } from './metadataService';
import { scrubString } from './scrubbers/stringScrubber';

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.keys(toScrub).reduce(
    (scrubbedValues: any, key: string) => {
      if (hasScrubberMetadata(toScrub, key)) {
        scrubbedValues[key] = scrubString(toScrub[key]);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
