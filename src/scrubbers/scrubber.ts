import { scrubDate } from './dateScrubber';
import { scrubNumber } from './numberScrubber';
import { scrubString } from './stringScrubber';

export const scrubValue = (toScrub: any): any => {
  if (typeof toScrub === 'number') {
    return scrubNumber(toScrub);
  }
  if (toScrub instanceof Date) {
    return scrubDate(toScrub);
  }

  return scrubString(toScrub);
};
