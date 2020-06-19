import { scrub, scrubObject } from '../index';

it('scrubs the properties that are decorated', () => {
  class ChildClass {
    childNumber = 54321;

    @scrub()
    childNumberToScrub = 9876;

    childString = '54321';

    @scrub()
    childStringToScrub = '09876';

    childDate = new Date();

    @scrub()
    childDateToScrub = new Date();
  }

  class ParentClass {
    parentNumber = 12345;

    @scrub()
    parentNumberToScrub = 67890;

    parentString = '12345';

    @scrub()
    parentStringToScrub = '67890';

    parentDate = new Date();

    @scrub()
    parentDateToScrub = new Date();

    child: ChildClass;

    constructor () {
      this.child = new ChildClass();
    }
  }

  const toScrub = new ParentClass();
  const scrubbed = scrubObject(toScrub);

  expect(scrubbed.parentNumber).toEqual(toScrub.parentNumber);
  expect(scrubbed.parentNumberToScrub).toEqual(8675309);
  expect(scrubbed.parentString).toEqual(toScrub.parentString);
  expect(scrubbed.parentStringToScrub).toEqual('********');
  expect(scrubbed.parentDate).toEqual(toScrub.parentDate);
  expect(scrubbed.parentDateToScrub).toEqual(new Date(9999, 11, 31));

  expect(scrubbed.child.childNumber).toEqual(toScrub.child.childNumber);
  expect(scrubbed.child.childNumberToScrub).toEqual(8675309);
  expect(scrubbed.child.childString).toEqual(toScrub.child.childString);
  expect(scrubbed.child.childStringToScrub).toEqual('********');
  expect(scrubbed.child.childDate).toEqual(toScrub.child.childDate);
  expect(scrubbed.child.childDateToScrub).toEqual(new Date(9999, 11, 31));
});
