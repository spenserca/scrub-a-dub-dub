import { encryptToJSON, encryptToString } from '../encryption/encryptorUtils';

export const encryptable = <T extends { new (...args: any[]): {} }>(
  constructor: T
) => {
  return class extends constructor {
    toString = () => encryptToString(this);
    toJSON = () => encryptToJSON(this);
  };
};
