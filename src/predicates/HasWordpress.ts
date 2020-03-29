import { Predicate } from 'types/predicate';

/**
 * Determine if parent page is based on WordPress.
 */
export const HasWordpress = new Predicate({
  fn: () => {
    const node = document.querySelectorAll('meta[content^="WordPress"]');
    if (node && node[0]) {
      return !!node[0];
    }
    return false;
  },
  name: 'Has Wordpress'
});

export default HasWordpress;
