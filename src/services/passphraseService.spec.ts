import { chance } from '../../chanceSetup';
import { getPassphrase } from './passphraseService';

describe('when passphrase generator is a string', () => {
  let actual: any;
  let passphrase: string;

  beforeEach(() => {
    passphrase = chance.string();

    actual = getPassphrase({ passphraseGenerator: passphrase });
  });

  it('returns the passphrase value', () => {
    expect(actual).toEqual(passphrase);
  });
});

describe('when passphrase generator is a function', () => {
  let actual: any;
  let passphrase: string;
  let passphraseGenerator: jest.Mock;

  beforeEach(() => {
    passphrase = chance.string();
    passphraseGenerator = jest.fn().mockReturnValue(passphrase);

    actual = getPassphrase({ passphraseGenerator: passphraseGenerator });
  });

  it('gets the passphrase from the passphrase generator', () => {
    expect(passphraseGenerator).toHaveBeenCalledTimes(1);
    expect(passphraseGenerator).toHaveBeenCalledWith();
  });

  it('returns the passphrase value', () => {
    expect(actual).toEqual(passphrase);
  });
});

describe('when passphrase generator is not a string or a function', () => {
  it('throws an exception', () => {
    let invalidPassphraseGenerator = chance.pickone([
      chance.integer(),
      chance.date()
    ]);
    expect(() =>
      // @ts-ignore
      getPassphrase({ passphraseGenerator: invalidPassphraseGenerator })
    ).toThrow(
      new Error(
        `[ERROR] Invalid passphrase generator: ${invalidPassphraseGenerator}`
      )
    );
  });
});
