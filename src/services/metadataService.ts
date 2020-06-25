import 'reflect-metadata';
import { EncryptionOptions } from '../decorators/encrypt';
import { ScrubberOptions } from '../decorators/scrub';

export const getMetadataForProperty = <T>(
  target: any,
  propertyKey: string,
  metadataKey: string
): T => {
  return Reflect.getMetadata(metadataKey, target, propertyKey);
};

export const hasMetadata = (
  target: any,
  propertyKey: string,
  metadataKey: string
): boolean => {
  return Reflect.hasMetadata(metadataKey, target, propertyKey);
};
