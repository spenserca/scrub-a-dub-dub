import { chance } from '../../chanceSetup';
import { scrubDate } from './dateScrubber';
import { scrubObject } from './objectScrubber';
import { scrubValue } from './scrubber';
import { scrubString } from './stringScrubber';

jest.mock('./stringScrubber');
jest.mock('./dateScrubber');

const scrubStringMock = scrubString as jest.Mock;
const scrubDateMock = scrubDate as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('scrubbing an undefined value', () => {
  let actual: any;
  let expected: string;

  beforeEach(() => {
    expected = chance.string();

    scrubStringMock.mockReturnValue(expected);

    actual = scrubValue(undefined);
  });

  it('gets the scrubbed string value', () => {
    expect(scrubStringMock).toHaveBeenCalledTimes(1);
    expect(scrubStringMock).toHaveBeenCalledWith(undefined);
  });

  it('returns the default scrubbed string value', () => {
    expect(actual).toEqual(expected);
  });
});

describe('scrubbing an unknown type value', () => {
  let actual: any;
  let expected: string;

  beforeEach(() => {
    expected = chance.string();

    scrubStringMock.mockReturnValue(expected);

    actual = scrubValue([]);
  });

  it('gets the scrubbed string value', () => {
    expect(scrubStringMock).toHaveBeenCalledTimes(1);
    expect(scrubStringMock).toHaveBeenCalledWith([]);
  });

  it('returns the default scrubbed string value', () => {
    expect(actual).toEqual(expected);
  });
});

describe('scrubbing a string value', () => {
  let actual: any;
  let expected: string;
  let toScrub: string;

  beforeEach(() => {
    expected = chance.string();
    toScrub = chance.string();

    scrubStringMock.mockReturnValue(expected);

    actual = scrubValue(toScrub);
  });

  it('gets the scrubbed string value', () => {
    expect(scrubStringMock).toHaveBeenCalledTimes(1);
    expect(scrubStringMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the default scrubbed string value', () => {
    expect(actual).toEqual(expected);
  });
});

describe('scrubbing a date value', () => {
  let actual: any;
  let expected: Date;
  let toScrub: Date;

  beforeEach(() => {
    expected = chance.date();
    toScrub = chance.date();

    scrubDateMock.mockReturnValue(expected);

    actual = scrubValue(toScrub);
  });

  it('gets the scrubbed date value', () => {
    expect(scrubDateMock).toHaveBeenCalledTimes(1);
    expect(scrubDateMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the default scrubbed date value', () => {
    expect(actual).toEqual(expected);
  });
});

describe('scrubbing an object', () => {
  let actual: any;
  let expected: any;
  let toScrub: any;

  beforeEach(() => {
    toScrub = { [chance.string()]: chance.string() };

    actual = scrubValue(toScrub);
  });
});
