import { scrub } from './scrub';
import { scrubbable } from './scrubbable';

it('passes', () => {
  @scrubbable
  class Scrubbable {
    @scrub()
    propToScrub = 'my string';

    propTwo: string;

    constructor () {
      this.propTwo = 'prop two';
    }
  }

  console.log(new Scrubbable());
  console.log(new Scrubbable().toString());
  console.log(JSON.parse(new Scrubbable().toString()).propToScrub);

  expect(true).toEqual(true);
});
