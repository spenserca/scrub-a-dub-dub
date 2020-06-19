import 'reflect-metadata';

export interface ScrubberOptions {
  scrubFunction: Function;
}

export const scrub = (options?: ScrubberOptions) => {
  return Reflect.metadata('scrubberOptions', options);
};
