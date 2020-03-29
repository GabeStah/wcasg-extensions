import { Action } from 'types/action';
import Css from '@/utility/css';

/**
 * Add screen reader classes.
 */
export const Export = new Action({
  fn: () => {
    const nodes = document.querySelectorAll(
      [
        'button',
        'label',
        'input',
        'span',
        'a',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ].join(', ')
    );
    if (!nodes || nodes.length === 0) return;

    nodes.forEach((element: Element) => {
      // sr-only
      if (!Css.hasClass({ node: element, name: 'sr-only' })) {
        Css.addClass({ node: element, name: 'sr-only' });
      }
      // sr-only-focusable
      if (!Css.hasClass({ node: element, name: 'sr-only-focusable' })) {
        Css.addClass({ node: element, name: 'sr-only-focusable' });
      }
    });
  },
  name: 'Add Sr Classes'
});

export default Export;
