import { encrypt, encryptable } from '../src';
import { decryptObject } from '../src/decryption/objectDecryptor';
import { encryptObject } from '../src/encryption/objectEncryptor';

class ChildClass {
  @encrypt({
    passphraseGenerator: () => 'childPassphrase1'
  })
  childNumberToEncrypt = 9876;

  @encrypt({
    passphraseGenerator: 'childPassphrase2'
  })
  childStringToEncrypt = '09876';

  @encrypt({
    passphraseGenerator: 'childPassphrase3'
  })
  childDateToEncrypt = new Date();

  constructor () {}
}

describe('when getting the string value the object', () => {
  it('encrypts the properties that are decorated', () => {
    @encryptable
    class ParentClass {
      @encrypt({
        passphraseGenerator: 'passphrase1'
      })
      parentNumberToEncrypt = 67890;

      @encrypt({
        passphraseGenerator: 'passphrase2'
      })
      parentStringToEncrypt = '67890';

      @encrypt({
        passphraseGenerator: 'passphrase3'
      })
      parentDateToEncrypt = new Date();

      child: ChildClass;

      constructor () {
        this.child = new ChildClass();
      }
    }

    const toEncrypt = new ParentClass();
    const encrypted = encryptObject(ParentClass, toEncrypt);
    const encryptedToString = JSON.parse(toEncrypt.toString());
    const encryptedToJSON = JSON.parse(JSON.stringify(toEncrypt, null, 2));

    let parentNumberToEncrypt = 9876;
    expect(encrypted.parentNumberToEncrypt).not.toBe(parentNumberToEncrypt);

    const decrypted = decryptObject(ParentClass, encrypted);
    const decryptedFromString = decryptObject(ParentClass, encryptedToString);
    const decryptedToJSON = decryptObject(ParentClass, encryptedToJSON);
    console.log(JSON.stringify(decrypted, null, 2));

    // expect(encrypted.parentStringToEncrypt).toEqual('********');
    // expect(encrypted.parentDateToEncrypt).toEqual(new Date(9999, 11, 31));
    //
    // expect(encrypted.child.childNumberToEncrypt).toEqual(8675309);
    // expect(encrypted.child.childStringToEncrypt).toEqual('********');
    // expect(encrypted.child.childDateToEncrypt).toEqual(new Date(9999, 11, 31));
  });

  describe('when a child object is decorated for encrypting', () => {
    it('recursively encrypts child object properties', () => {
      @encryptable
      class ParentClass {
        @encrypt({
          passphraseGenerator: 'passphrase1'
        })
        parentNumberToEncrypt = 67890;

        @encrypt({
          passphraseGenerator: 'passphrase2'
        })
        parentStringToEncrypt = '67890';

        @encrypt({
          passphraseGenerator: 'passphrase3'
        })
        parentDateToEncrypt = new Date();

        @encrypt({
          passphraseGenerator: 'passphrase4'
        })
        child: ChildClass;

        constructor () {
          this.child = new ChildClass();
        }
      }

      const toEncrypt = new ParentClass();
      const encrypted = JSON.parse(toEncrypt.toString());

      expect(encrypted.parentNumberToEncrypt).toEqual(8675309);
      expect(encrypted.parentStringToEncrypt).toEqual('********');
      expect(encrypted.parentDateToEncrypt).toEqual(new Date(9999, 11, 31));

      expect(encrypted.child.childNumberToEncrypt).toEqual(8675309);
      expect(encrypted.child.childStringToEncrypt).toEqual('********');
      expect(encrypted.child.childDateToEncrypt).toEqual(
        new Date(9999, 11, 31)
      );
    });
  });
});
