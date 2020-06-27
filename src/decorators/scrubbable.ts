import { scrubObject } from '..';

const scrubToString = (toScrub: any): string => {
  return JSON.stringify(scrubObject(toScrub));
};

export function scrubbable<T extends { new (...args: any[]): {} }> (
  constructor: T
) {
  return class extends constructor {
    toString = () => scrubToString(this);
  };
}
