import { index } from './index';

it('says hello', () => {
  const actual = index();

  expect(actual).toEqual('hello world!');
});
