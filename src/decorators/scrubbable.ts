import { scrubToJSON, scrubToString } from '../scrubbers/scrubberUtils';

export const scrubbable = <T extends { new (...args: any[]): {} }>(
  constructor: T
) => {
  return class extends constructor {
    toString = () => scrubToString(this);
    toJSON = () => scrubToJSON(this);
  };
};
