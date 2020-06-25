import { chance } from '../../chanceSetup';
import { isObjectWithKeys } from './objectFilter';

describe('when input is an object with keys', () => {
  let actual: any;

  beforeEach(() => {
    actual = isObjectWithKeys({ [chance.string()]: chance.string() });
  });

  it('returns true', () => {
    expect(actual).toBe(true);
  });
});

describe('when input is an object with no keys', () => {
  let actual: any;

  beforeEach(() => {
    actual = isObjectWithKeys({});
  });

  it('returns false', () => {
    expect(actual).toBe(false);
  });
});

const types: any = {
  string: chance.string(),
  number: chance.integer(),
  date: chance.date()
};

describe.each(Object.entries(types))(
  'when input is of type %s',
  (type: string, value: any) => {
    let actual: any;

    beforeEach(() => {
      actual = isObjectWithKeys(value);
    });

    it('returns false', () => {
      expect(actual).toBe(false);
    });
  }
);
