import { Extension } from 'types/extension';
import HasBootstrap from 'predicates/HasBootstrap';
import Css from '@/utility/css';

export const AddScreenReaderOnlyClasses = new Extension({
  action: () => {
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
  description:
    "Adds 'sr-only' and 'sr-only-focusable' attributes to all buttons, labels, and primary text elements.",
  enabled: false,
  name: 'AddScreenReaderOnlyClasses',
  predicate: HasBootstrap
});

export default AddScreenReaderOnlyClasses;
