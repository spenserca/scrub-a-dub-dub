import { encrypt } from '../src/decorators/encrypt';
import { encryptObject } from '../src/encryption/objectEncryptor';

class ChildClass {
  childNumber = 54321;

  @encrypt({
    passphrase: 'passphrase'
  })
  childNumberToScrub = 9876;

  childString = '54321';

  @encrypt({
    passphrase: 'passphrase'
  })
  childStringToScrub = '09876';

  childDate = new Date();

  @encrypt({
    passphrase: 'passphrase'
  })
  childDateToScrub = new Date();
}

it('scrubs the properties that are decorated', () => {
  class ParentClass {
    parentNumber = 12345;

    @encrypt({
      passphrase: 'passphrase'
    })
    parentNumberToScrub = 67890;

    parentString = '12345';

    @encrypt({
      passphrase: 'passphrase'
    })
    parentStringToScrub = '67890';

    parentDate = new Date();

    @encrypt({
      passphrase: 'passphrase'
    })
    parentDateToScrub = new Date();

    child: ChildClass;

    constructor () {
      this.child = new ChildClass();
    }
  }

  const toEncrypt = new ParentClass();
  const encrypted = encryptObject(toEncrypt);

  expect(encrypted.parentNumber).toEqual(toEncrypt.parentNumber);
  expect(encrypted.parentNumberToScrub).toEqual(8675309);
  expect(encrypted.parentString).toEqual(toEncrypt.parentString);
  expect(encrypted.parentStringToScrub).toEqual('********');
  expect(encrypted.parentDate).toEqual(toEncrypt.parentDate);
  expect(encrypted.parentDateToScrub).toEqual(new Date(9999, 11, 31));
  expect(encrypted.parentPropToScrubWithCustomScrubber).toEqual(
    'spenser was not here'
  );

  expect(encrypted.child.childNumber).toEqual(toEncrypt.child.childNumber);
  expect(encrypted.child.childNumberToScrub).toEqual(8675309);
  expect(encrypted.child.childString).toEqual(toEncrypt.child.childString);
  expect(encrypted.child.childStringToScrub).toEqual('********');
  expect(encrypted.child.childDate).toEqual(toEncrypt.child.childDate);
  expect(encrypted.child.childDateToScrub).toEqual(new Date(9999, 11, 31));
  expect(encrypted.child.childPropToScrubWithCustomScrubber).toEqual(
    "spenser's child was not here"
  );
});

describe('when a child object is decorated for scrubbing', () => {
  it('recursively scrubs child objects', () => {
    class ParentClass {
      @encrypt({
        passphrase: 'passphrase'
      })
      parentNumber = 12345;

      @encrypt({
        passphrase: 'passphrase'
      })
      parentNumberToScrub = 67890;

      parentString = '12345';

      @encrypt({
        passphrase: 'passphrase'
      })
      parentStringToScrub = '67890';

      parentDate = new Date();

      @encrypt({
        passphrase: 'passphrase'
      })
      parentDateToScrub = new Date();

      @encrypt({
        passphrase: 'passphrase'
      })
      child: ChildClass;

      constructor () {
        this.child = new ChildClass();
      }
    }

    const toEncrypt = new ParentClass();
    const encrypted = encryptObject(toEncrypt);

    expect(encrypted.parentNumber).toEqual(toEncrypt.parentNumber);
    expect(encrypted.parentNumberToScrub).toEqual(8675309);
    expect(encrypted.parentString).toEqual(toEncrypt.parentString);
    expect(encrypted.parentStringToScrub).toEqual('********');
    expect(encrypted.parentDate).toEqual(toEncrypt.parentDate);
    expect(encrypted.parentDateToScrub).toEqual(new Date(9999, 11, 31));
    expect(encrypted.parentPropToScrubWithCustomScrubber).toEqual(
      'spenser was not here'
    );

    expect(encrypted.child.childNumber).toEqual(toEncrypt.child.childNumber);
    expect(encrypted.child.childNumberToScrub).toEqual(8675309);
    expect(encrypted.child.childString).toEqual(toEncrypt.child.childString);
    expect(encrypted.child.childStringToScrub).toEqual('********');
    expect(encrypted.child.childDate).toEqual(toEncrypt.child.childDate);
    expect(encrypted.child.childDateToScrub).toEqual(new Date(9999, 11, 31));
    expect(encrypted.child.childPropToScrubWithCustomScrubber).toEqual(
      "spenser's child was not here"
    );
  });
});
