import { chance } from '../../chanceSetup';
import { scrubObject } from './objectScrubber';
import { scrubToJSON, scrubToString } from './scrubberUtils';

jest.mock('./objectScrubber');

const scrubObjectMock = scrubObject as jest.Mock;

describe('when scrubbing to a string', () => {
  let actual: any;
  let toScrub: any;
  let expected: string;

  beforeEach(() => {
    toScrub = { [chance.string()]: chance.string() };
    expected = `{\"${chance.string()}\":\"${chance.string()}\"}`;
    let scrubbed = JSON.parse(expected);

    scrubObjectMock.mockReturnValue(scrubbed);

    actual = scrubToString(toScrub);
  });

  it('gets the scrubbed object', () => {
    expect(scrubObjectMock).toHaveBeenCalledTimes(1);
    expect(scrubObjectMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the scrubbed object as its string representation', () => {
    expect(actual).toEqual(expected);
  });
});

describe('when scrubbing to json', () => {
  let actual: any;
  let toScrub: any;
  let expected: any;

  beforeEach(() => {
    toScrub = { [chance.string()]: chance.string() };
    expected = { [chance.string()]: chance.string() };

    scrubObjectMock.mockReturnValue(expected);

    actual = scrubToJSON(toScrub);
  });

  it('gets the scrubbed object', () => {
    expect(scrubObjectMock).toHaveBeenCalledTimes(1);
    expect(scrubObjectMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the scrubbed object', () => {
    expect(actual).toEqual(expected);
  });
});
