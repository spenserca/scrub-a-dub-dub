import { chance } from '../../chanceSetup';
import { scrubNumber } from './numberScrubber';

let actual: any;

beforeEach(() => {
  actual = scrubNumber(chance.integer());
});

it('returns the default scrubbed number', () => {
  expect(actual).toBeUndefined();
});
