import { AES } from 'crypto-js';
import { encrypt } from '../src/decorators/encrypt';
import { decryptObject } from '../src/decryption/objectDecryptor';
import { encryptObject } from '../src/encryption/objectEncryptor';
import CryptoJS = require('crypto-js');

class ChildClass {
  @encrypt({
    passphraseGenerator: () => 'a47edfc9-cd44-4222-9e3d-a41702119056'
  })
  childNumberToEncrypt = 9876;

  @encrypt({
    passphraseGenerator: '6ee11e6c-5909-48b3-abbe-81cb39a62d82'
  })
  childStringToEncrypt = '09876';

  @encrypt({
    passphraseGenerator: 'a5c4b87e-0a0f-4dce-981a-85b0c05eb699'
  })
  childDateToEncrypt = new Date();
}

it('encrypts the properties that are decorated', () => {
  class ParentClass {
    @encrypt({
      passphraseGenerator: '5e60d03d-0061-45a9-b328-16f53f01401c'
    })
    parentNumberToEncrypt = 67890;

    @encrypt({
      passphraseGenerator: '7280006e-e59b-4633-a715-a6b8176f780f'
    })
    parentStringToEncrypt = '67890';

    @encrypt({
      passphraseGenerator: '8a14d4c6-5031-4115-8164-93ee1f1af60e'
    })
    parentDateToEncrypt = new Date();

    child: ChildClass;

    constructor () {
      this.child = new ChildClass();
    }
  }

  const toEncrypt = new ParentClass();
  const encrypted = encryptObject<ParentClass>(toEncrypt);

  let parentNumberToEncrypt = 9876;
  expect(encrypted.parentNumberToEncrypt).not.toBe(parentNumberToEncrypt);
  // expect(encrypted.parentStringToEncrypt).toEqual('********');
  // expect(encrypted.parentDateToEncrypt).toEqual(new Date(9999, 11, 31));
  //
  // expect(encrypted.child.childNumberToEncrypt).toEqual(8675309);
  // expect(encrypted.child.childStringToEncrypt).toEqual('********');
  // expect(encrypted.child.childDateToEncrypt).toEqual(new Date(9999, 11, 31));

  const decrypted = decryptObject<ParentClass>(encrypted);
  expect(decrypted.parentNumberToEncrypt).toBe(parentNumberToEncrypt);
});

describe('when a child object is decorated for encrypting', () => {
  it('recursively encrypts child object properties', () => {
    class ParentClass {
      @encrypt({
        passphraseGenerator: 'cad2a8da-ce2a-4092-929a-fe1e0e29ca0e'
      })
      parentNumberToEncrypt = 67890;

      @encrypt({
        passphraseGenerator: 'f7379bb7-65bb-4688-b98d-6fd9e607f1af'
      })
      parentStringToEncrypt = '67890';

      @encrypt({
        passphraseGenerator: 'b23021c6-094b-4507-a0af-07a5c43ebbba'
      })
      parentDateToEncrypt = new Date();

      @encrypt({
        passphraseGenerator: 'a4f19b64-cf96-4d5e-be9e-a1ab1ca47cac'
      })
      child: ChildClass;

      constructor () {
        this.child = new ChildClass();
      }
    }

    const toEncrypt = new ParentClass();
    const encrypted = encryptObject<ParentClass>(toEncrypt);

    expect(encrypted.parentNumberToEncrypt).toEqual(8675309);
    expect(encrypted.parentStringToEncrypt).toEqual('********');
    expect(encrypted.parentDateToEncrypt).toEqual(new Date(9999, 11, 31));

    expect(encrypted.child.childNumberToEncrypt).toEqual(8675309);
    expect(encrypted.child.childStringToEncrypt).toEqual('********');
    expect(encrypted.child.childDateToEncrypt).toEqual(new Date(9999, 11, 31));
  });
});

it('should encrypt', () => {
  const value = 67890;
  const passphrase = '5e60d03d-0061-45a9-b328-16f53f01401c';

  const encrypted = AES.encrypt(value.toString(), passphrase);

  expect(encrypted.toString()).not.toEqual(value.toString());

  const decrypted = AES.decrypt(encrypted, passphrase).toString(
    CryptoJS.enc.Utf8
  );

  expect(parseInt(decrypted)).toEqual(value);
});
