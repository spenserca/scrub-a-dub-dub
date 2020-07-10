import { scrub } from '../src';
import { scrubbable } from '../src/decorators/scrubbable';

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

  @scrub({
    scrubFunction: () => 'child was not here'
  })
  childPropToScrubWithCustomScrubber = 'child was here';
}

it('scrubs the properties that are decorated', () => {
  @scrubbable
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

    @scrub({
      scrubFunction: () => 'spenser was not here'
    })
    parentPropToScrubWithCustomScrubber = 'spenser was here';

    child: ChildClass;

    constructor () {
      this.child = new ChildClass();
    }
  }

  const toScrub = new ParentClass();
  const scrubbed = JSON.parse(JSON.stringify(toScrub));

  expect(scrubbed.parentNumber).toEqual(toScrub.parentNumber);
  expect(scrubbed.parentNumberToScrub).toEqual(8675309);
  expect(scrubbed.parentString).toEqual(toScrub.parentString);
  expect(scrubbed.parentStringToScrub).toEqual('********');
  expect(new Date(scrubbed.parentDate)).toEqual(toScrub.parentDate);
  expect(new Date(scrubbed.parentDateToScrub)).toEqual(new Date(9999, 11, 31));
  expect(scrubbed.parentPropToScrubWithCustomScrubber).toEqual(
    'spenser was not here'
  );

  expect(scrubbed.child.childNumber).toEqual(toScrub.child.childNumber);
  expect(scrubbed.child.childNumberToScrub).toEqual(8675309);
  expect(scrubbed.child.childString).toEqual(toScrub.child.childString);
  expect(scrubbed.child.childStringToScrub).toEqual('********');
  expect(new Date(scrubbed.child.childDate)).toEqual(toScrub.child.childDate);
  expect(new Date(scrubbed.child.childDateToScrub)).toEqual(
    new Date(9999, 11, 31)
  );
  expect(scrubbed.child.childPropToScrubWithCustomScrubber).toEqual(
    'child was not here'
  );
});

describe('when a child object is decorated for scrubbing', () => {
  it('recursively scrubs child objects', () => {
    @scrubbable
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

      @scrub({
        scrubFunction: () => 'spenser was not here'
      })
      parentPropToScrubWithCustomScrubber = 'spenser was here';

      @scrub()
      child: ChildClass;

      constructor () {
        this.child = new ChildClass();
      }
    }

    const toScrub = new ParentClass();
    const scrubbed = JSON.parse(JSON.stringify(toScrub));

    expect(scrubbed.parentNumber).toEqual(toScrub.parentNumber);
    expect(scrubbed.parentNumberToScrub).toEqual(8675309);
    expect(scrubbed.parentString).toEqual(toScrub.parentString);
    expect(scrubbed.parentStringToScrub).toEqual('********');
    expect(new Date(scrubbed.parentDate)).toEqual(toScrub.parentDate);
    expect(new Date(scrubbed.parentDateToScrub)).toEqual(
      new Date(9999, 11, 31)
    );
    expect(scrubbed.parentPropToScrubWithCustomScrubber).toEqual(
      'spenser was not here'
    );

    expect(scrubbed.child.childNumber).toEqual(toScrub.child.childNumber);
    expect(scrubbed.child.childNumberToScrub).toEqual(8675309);
    expect(scrubbed.child.childString).toEqual(toScrub.child.childString);
    expect(scrubbed.child.childStringToScrub).toEqual('********');
    expect(new Date(scrubbed.child.childDate)).toEqual(toScrub.child.childDate);
    expect(new Date(scrubbed.child.childDateToScrub)).toEqual(
      new Date(9999, 11, 31)
    );
    expect(scrubbed.child.childPropToScrubWithCustomScrubber).toEqual(
      'child was not here'
    );
  });
});
