import { Predicate } from 'types/predicate';

/**
 * Determine if Bootstrap is running.
 */
export const HasBootstrap = new Predicate({
  fn: () => !!window['bootstrap'],
  name: 'Has Bootstrap'
});

export default HasBootstrap;
