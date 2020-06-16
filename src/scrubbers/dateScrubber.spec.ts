import { chance } from '../../chanceSetup';
import { scrubDate } from './dateScrubber';

let actual: any;

beforeEach(() => {
  actual = scrubDate(chance.date());
});

it('returns the default scrubbed date', () => {
  expect(actual).toEqual(new Date(9999, 11, 31));
});
