import { scrubObject } from './objectScrubber';

export const scrubToString = (toScrub: any): string => {
  return JSON.stringify(scrubObject(toScrub));
};

export const scrubToJSON = (toScrub: any): any => {
  return scrubObject(toScrub);
};
