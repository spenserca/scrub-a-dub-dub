import { scrubString } from './stringScrubber';

let actual: any;

beforeEach(() => {
  actual = scrubString();
});

it('returns the default scrubbed string', () => {
  expect(actual).toBe('********');
});
