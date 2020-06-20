# scrub-a-dub-dub

A utility for marking object properties for data sanitization

## Usage

This library provides these defaults to apply during scrubbing:

| type       | default      |
| ---------- | ------------ |
| string     | **\*\*\*\*** |
| number     | 8675309      |
| Date       | 12/31/9999   |
| all others | **\*\*\*\*** |

You can use the default values by following these steps:

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

Alternatively, you can provide your own scrubbing function to the decorator to override
the default scrubbing methods:

1. For a given class mark properties that you want scrubbed with the `@scrub` decorator

   ```ts
   export class SomeClass {
     @scrub({
       scrubFunction: () => 'spenser was not here'
     })
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
   console.log(scrubbed.propertyToScrub); // logs the override's scrubbed string 'spenser was not here' and not 'hello world'
   ```
