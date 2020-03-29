import { Predicate } from 'types/predicate';

/**
 * Determine if jQuery is running.
 */
export const HasJquery = new Predicate({
  fn: () => !!window['jQuery'],
  name: 'Has jQuery'
});

export default HasJquery;
