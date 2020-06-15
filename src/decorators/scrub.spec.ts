import 'reflect-metadata';
import { chance } from '../../chanceSetup';
import { scrub, ScrubberOptions } from './scrub';
import { scrubString } from '../scrubbers/stringScrubber';

jest.mock('reflect-metadata');
jest.mock('../scrubbers/stringScrubber');

const metadataSpy = jest.spyOn(Reflect, 'metadata');
const scrubStringMock = scrubString as jest.Mock;

describe('when options are passed', () => {
  let actual: any;
  let expectedOptions: ScrubberOptions;

  beforeEach(() => {
    jest.resetAllMocks();

    let options = ({
      [chance.string()]: chance.string()
    } as unknown) as ScrubberOptions;
    let defaultOptions = {
      scrubFunction: scrubStringMock
    };
    expectedOptions = Object.assign({}, options, defaultOptions);

    actual = scrub(options);
  });

  it('sets the scrubber options metadata', () => {
    expect(metadataSpy).toHaveBeenCalledTimes(1);
    expect(metadataSpy).toHaveBeenCalledWith(
      'scrubberOptions',
      expect.anything()
    );
  });

  it('combines the default options with the passed options', () => {
    expect(metadataSpy).toHaveBeenCalledTimes(1);
    expect(metadataSpy).toHaveBeenCalledWith(
      expect.any(String),
      expectedOptions
    );
  });
});
