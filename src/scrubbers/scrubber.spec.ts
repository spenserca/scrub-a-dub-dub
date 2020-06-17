import { chance } from '../../chanceSetup';
import { scrubDate } from './dateScrubber';
import { scrubNumber } from './numberScrubber';
import { scrubObject } from './objectScrubber';
import { scrubValue } from './scrubber';
import { scrubString } from './stringScrubber';

jest.mock('./stringScrubber');
jest.mock('./dateScrubber');
jest.mock('./objectScrubber');
jest.mock('./numberScrubber');

const scrubStringMock = scrubString as jest.Mock;
const scrubDateMock = scrubDate as jest.Mock;
const scrubObjectMock = scrubObject as jest.Mock;
const scrubNumberMock = scrubNumber as jest.Mock;

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
    expected = { [chance.string()]: chance.string() };

    scrubObjectMock.mockReturnValue(expected);

    actual = scrubValue(toScrub);
  });

  it('gets the scrubbed object value', () => {
    expect(scrubObjectMock).toHaveBeenCalledTimes(1);
    expect(scrubObjectMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the scrubbed object', () => {
    expect(actual).toEqual(expected);
  });
});

describe('scrubbing a number', () => {
  let actual: any;
  let expected: number;
  let toScrub: number;

  beforeEach(() => {
    expected = chance.integer();
    toScrub = chance.integer();

    scrubNumberMock.mockReturnValue(expected);

    actual = scrubValue(toScrub);
  });

  it('gets the scrubbed number', () => {
    expect(scrubNumberMock).toHaveBeenCalledTimes(1);
    expect(scrubNumberMock).toHaveBeenCalledWith(toScrub);
  });

  it('returns the scrubbed number', () => {
    expect(actual).toEqual(expected);
  });
});
