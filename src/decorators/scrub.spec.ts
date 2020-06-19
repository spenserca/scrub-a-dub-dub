import 'reflect-metadata';
import { chance } from '../../chanceSetup';
import { scrub, ScrubberOptions } from './scrub';

jest.mock('reflect-metadata');

const metadataSpy = jest.spyOn(Reflect, 'metadata');

describe('when options are passed', () => {
  let actual: any;
  let options: ScrubberOptions;

  beforeEach(() => {
    jest.resetAllMocks();

    options = ({
      [chance.string()]: chance.string()
    } as unknown) as ScrubberOptions;

    actual = scrub(options);
  });

  it('sets the scrubber options metadata', () => {
    expect(metadataSpy).toHaveBeenCalledTimes(1);
    expect(metadataSpy).toHaveBeenCalledWith('scrubberOptions', options);
  });
});
