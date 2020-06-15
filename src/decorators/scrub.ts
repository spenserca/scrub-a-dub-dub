import 'reflect-metadata';
import { scrubString } from '../scrubbers/stringScrubber';

export interface ScrubberOptions {
  scrubFunction: Function;
}

export const scrub = (options?: ScrubberOptions) => {
  const defaultScrubberOptions = {
    scrubFunction: scrubString
  };
  const scrubberOptions = { ...defaultScrubberOptions, ...options };

  return Reflect.metadata('scrubberOptions', scrubberOptions);
};
