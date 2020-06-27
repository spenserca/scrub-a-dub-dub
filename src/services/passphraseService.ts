import { EncryptionOptions } from '../decorators/encrypt';

export const getPassphrase = (
  metadataForProperty: EncryptionOptions
): string => {
  const passphraseGenerator = metadataForProperty.passphraseGenerator;
  if (typeof passphraseGenerator === 'string') {
    return passphraseGenerator;
  }
  if (typeof passphraseGenerator === 'function') {
    return passphraseGenerator();
  }

  throw new Error(
    `[ERROR] Invalid passphrase generator: ${passphraseGenerator}`
  );
};
