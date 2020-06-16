import 'reflect-metadata';
import { scrubString } from './scrubbers/stringScrubber';

export const scrubObject = (toScrub: any): any => {
  const scrubbed = Object.keys(toScrub).reduce(
    (scrubbedValues: any, key: string) => {
      if (Reflect.hasMetadata('scrubberOptions', toScrub, key)) {
        scrubbedValues[key] = scrubString(toScrub[key]);
      }

      return scrubbedValues;
    },
    {}
  );

  return { ...toScrub, ...scrubbed };
};
