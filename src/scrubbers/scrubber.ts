import { scrubDate } from './dateScrubber';
import { scrubObject } from './objectScrubber';
import { scrubString } from './stringScrubber';

export const scrubValue = (toScrub: any): any => {
  if (typeof toScrub === 'string' || typeof toScrub === 'undefined') {
    return scrubString(toScrub);
  }
  if (toScrub instanceof Date) {
    return scrubDate(toScrub);
  }
  if (typeof toScrub === 'object' && Object.keys(toScrub).length !== 0) {
    return scrubObject(toScrub);
  }

  return scrubString(toScrub);
};
