import 'reflect-metadata';

type PassPhraseGenerator = (params?: any) => string;

export interface EncryptionOptions {
  passphraseGenerator: string | PassPhraseGenerator;
}

export const encrypt = (options: EncryptionOptions) => {
  return Reflect.metadata('encryptionOptions', options);
};
