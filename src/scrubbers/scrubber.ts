import { scrubDate } from './dateScrubber';
import { scrubNumber } from './numberScrubber';
import { scrubObject } from './objectScrubber';
import { scrubString } from './stringScrubber';

export const scrubValue = (toScrub: any): any => {
  if (typeof toScrub === 'number') {
    return scrubNumber(toScrub);
  }
  if (toScrub instanceof Date) {
    return scrubDate(toScrub);
  }
  if (typeof toScrub === 'object' && Object.keys(toScrub).length !== 0) {
    return scrubObject(toScrub);
  }

  return scrubString(toScrub);
};
