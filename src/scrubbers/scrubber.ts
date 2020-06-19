import { ScrubberOptions } from '../decorators/scrub';
import { scrubDate } from './dateScrubber';
import { scrubNumber } from './numberScrubber';
import { scrubString } from './stringScrubber';

export const scrubValue = (
  toScrub: any,
  metadataForProperty: ScrubberOptions
): any => {
  if (metadataForProperty?.scrubFunction) {
    return metadataForProperty.scrubFunction(toScrub);
  }
  if (typeof toScrub === 'number') {
    return scrubNumber(toScrub);
  }
  if (toScrub instanceof Date) {
    return scrubDate(toScrub);
  }

  return scrubString(toScrub);
};
