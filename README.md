# scrub-a-dub-dub

A utility for marking object properties for data sanitization

## Usage

1. For a given class mark properties that you want scrubbed with the `@scrub` decorator

   ```ts
   export class SomeClass {
     @scrub()
     propertyToScrub: string;

     constructor (message: string) {
       this.propertyToScrub = message;
     }
   }
   ```

1. Scrub the object by calling `scrubObject`
   ```ts
   const scrubbed = scrubObject(new SomeClass('hello world'));
   ```
1. Any properties that are marked should be scrubbed
   ```ts
   console.log(scrubbed.propertyToScrub); // logs the default scrubbed string '********' and not 'hello world'
   ```
