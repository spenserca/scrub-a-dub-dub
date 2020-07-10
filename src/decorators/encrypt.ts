import 'reflect-metadata';

export interface EncryptionOptions {
  passphrase: string;
}

export const encrypt = (options: EncryptionOptions) => {
  return Reflect.metadata('encryptionOptions', options);
};
