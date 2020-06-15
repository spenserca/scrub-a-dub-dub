import { chance } from '../chanceSetup';
import { scrub } from './decorators/scrub';
import { scrubObject } from './index';

class TestClass {
  propertyOne: string;

  @scrub()
  stringToScrub: string;

  constructor(one: string, two: string) {
    this.propertyOne = one;
    this.stringToScrub = two;
  }
}

let actual: TestClass;
let expectedPropertyOne: string;

beforeEach(() => {
  expectedPropertyOne = chance.string();
  let actualPropertyToScrub = chance.string();

  const testClass = new TestClass(expectedPropertyOne, actualPropertyToScrub);

  actual = scrubObject(testClass);
});

it('doesnt change a string without the scrub decorator', () => {
  expect(actual.propertyOne).toEqual(expectedPropertyOne);
});

it('changes a string with the scrub decorator the default scrubbed string', () => {
  expect(actual.stringToScrub).toEqual('********');
});
