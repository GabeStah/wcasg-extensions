import { Predicate } from 'types/predicate';

/**
 * Determine if jQuery is running.
 */
export const HasJquery = new Predicate({
  fn: () => !!window['jQuery'],
  name: 'HasjQuery'
});

export default HasJquery;
