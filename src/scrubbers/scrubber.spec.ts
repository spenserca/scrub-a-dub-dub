import { chance } from '../../chanceSetup';
import { ScrubberOptions } from '../decorators/scrub';
import { scrubDate } from './dateScrubber';
import { scrubNumber } from './numberScrubber';
import { scrubValue } from './scrubber';
import { scrubString } from './stringScrubber';

jest.mock('./stringScrubber');
jest.mock('./dateScrubber');
jest.mock('./objectScrubber');
jest.mock('./numberScrubber');

const scrubStringMock = scrubString as jest.Mock;
const scrubDateMock = scrubDate as jest.Mock;
const scrubNumberMock = scrubNumber as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('when a custom scrubber is not configured for the property', () => {
  describe('scrubbing an undefined value', () => {
    let actual: any;
    let expected: string;

    beforeEach(() => {
      expected = chance.string();
      let metadataForProperty = {} as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(undefined, metadataForProperty);
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
      let metadataForProperty = {} as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue([], metadataForProperty);
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
      let metadataForProperty = {} as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
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
      let metadataForProperty = {} as ScrubberOptions;

      scrubDateMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
    });

    it('gets the scrubbed date value', () => {
      expect(scrubDateMock).toHaveBeenCalledTimes(1);
      expect(scrubDateMock).toHaveBeenCalledWith(toScrub);
    });

    it('returns the default scrubbed date value', () => {
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
      let metadataForProperty = {} as ScrubberOptions;

      scrubNumberMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
    });

    it('gets the scrubbed number', () => {
      expect(scrubNumberMock).toHaveBeenCalledTimes(1);
      expect(scrubNumberMock).toHaveBeenCalledWith(toScrub);
    });

    it('returns the scrubbed number', () => {
      expect(actual).toEqual(expected);
    });
  });
});

describe('when a custom scrubber is configured for the property', () => {
  describe('scrubbing an undefined value', () => {
    let actual: any;
    let expected: any;
    let scrubFunctionMock: jest.Mock;

    beforeEach(() => {
      expected = { [chance.string()]: chance.string() };

      scrubFunctionMock = jest.fn().mockReturnValue(expected);

      let metadataForProperty = {
        scrubFunction: scrubFunctionMock
      } as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(undefined, metadataForProperty);
    });

    it('gets the scrubbed value from the configured scrub function', () => {
      expect(scrubFunctionMock).toHaveBeenCalledTimes(1);
      expect(scrubFunctionMock).toHaveBeenCalledWith(undefined);
    });

    it('returns the configured scrubbed value', () => {
      expect(actual).toEqual(expected);
    });
  });

  describe('scrubbing an unknown type value', () => {
    let actual: any;
    let expected: any;
    let scrubFunctionMock: jest.Mock;

    beforeEach(() => {
      expected = { [chance.string()]: chance.string() };

      scrubFunctionMock = jest.fn().mockReturnValue(expected);

      let metadataForProperty = {
        scrubFunction: scrubFunctionMock
      } as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue([], metadataForProperty);
    });

    it('gets the scrubbed string value', () => {
      expect(scrubFunctionMock).toHaveBeenCalledTimes(1);
      expect(scrubFunctionMock).toHaveBeenCalledWith([]);
    });

    it('returns the default scrubbed string value', () => {
      expect(actual).toEqual(expected);
    });
  });

  describe('scrubbing a string value', () => {
    let actual: any;
    let expected: any;
    let scrubFunctionMock: jest.Mock;
    let toScrub: string;

    beforeEach(() => {
      toScrub = chance.string();
      expected = { [chance.string()]: chance.string() };

      scrubFunctionMock = jest.fn().mockReturnValue(expected);

      let metadataForProperty = {
        scrubFunction: scrubFunctionMock
      } as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
    });

    it('gets the scrubbed string value', () => {
      expect(scrubFunctionMock).toHaveBeenCalledTimes(1);
      expect(scrubFunctionMock).toHaveBeenCalledWith(toScrub);
    });

    it('returns the default scrubbed string value', () => {
      expect(actual).toEqual(expected);
    });
  });

  describe('scrubbing a date value', () => {
    let actual: any;
    let expected: any;
    let scrubFunctionMock: jest.Mock;
    let toScrub: Date;

    beforeEach(() => {
      toScrub = chance.date();
      expected = { [chance.string()]: chance.string() };

      scrubFunctionMock = jest.fn().mockReturnValue(expected);

      let metadataForProperty = {
        scrubFunction: scrubFunctionMock
      } as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
    });

    it('gets the scrubbed date value', () => {
      expect(scrubFunctionMock).toHaveBeenCalledTimes(1);
      expect(scrubFunctionMock).toHaveBeenCalledWith(toScrub);
    });

    it('returns the default scrubbed date value', () => {
      expect(actual).toEqual(expected);
    });
  });

  describe('scrubbing a number', () => {
    let actual: any;
    let expected: any;
    let scrubFunctionMock: jest.Mock;
    let toScrub: number;

    beforeEach(() => {
      toScrub = chance.integer();
      expected = { [chance.string()]: chance.string() };

      scrubFunctionMock = jest.fn().mockReturnValue(expected);

      let metadataForProperty = {
        scrubFunction: scrubFunctionMock
      } as ScrubberOptions;

      scrubStringMock.mockReturnValue(expected);

      actual = scrubValue(toScrub, metadataForProperty);
    });

    it('gets the scrubbed number', () => {
      expect(scrubFunctionMock).toHaveBeenCalledTimes(1);
      expect(scrubFunctionMock).toHaveBeenCalledWith(toScrub);
    });

    it('returns the scrubbed number', () => {
      expect(actual).toEqual(expected);
    });
  });
});
