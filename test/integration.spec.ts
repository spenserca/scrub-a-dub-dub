import { scrub, scrubObject } from '../src';

// TODO: make this an actual test
it('should do something', () => {
  class myChildClass {
    myChildNumber = 54321;

    @scrub()
    myChildNumberToScrub = 9876;

    myChildString = '54321';

    @scrub()
    myChildStringToScrub = '09876';
  }

  class myTestClass {
    myNumber = 12345;

    @scrub()
    myNumberToScrub = 67890;

    myString = '12345';

    @scrub()
    myStringToScrub = '67890';

    myChild: myChildClass;

    constructor () {
      this.myChild = new myChildClass();
    }
  }

  const toScrub = new myTestClass();

  console.log(JSON.stringify(toScrub, null, 2));

  const scrubbed = scrubObject(toScrub);

  console.log(JSON.stringify(scrubbed, null, 2));

  expect(true).toBeTruthy();
});
