import { scrubDate } from './dateScrubber';
import { scrubString } from './stringScrubber';

export const scrubValue = (toScrub: any): any => {
  if (typeof toScrub === 'string' || typeof toScrub === 'undefined') {
    return scrubString(toScrub);
  }
  if (toScrub instanceof Date) {
    return scrubDate(toScrub);
  }

  return scrubString(toScrub);
};
