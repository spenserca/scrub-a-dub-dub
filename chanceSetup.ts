import { Chance } from 'chance';

const seed = new Date().getTime();
console.log(`Using chance seed: ${seed}`);

export const chance: Chance.Chance = new Chance(seed);
