import { chance } from '../../chanceSetup';
import { scrubString } from './stringScrubber';

let actual: any;

beforeEach(() => {
  actual = scrubString(chance.string());
});

it('returns the default scrubbed string', () => {
  expect(actual).toBe('********');
});
