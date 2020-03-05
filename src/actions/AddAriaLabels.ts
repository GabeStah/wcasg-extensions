import { Action } from 'types/action';
import Aria from '@/utility/aria';
import Utility, { DOMValueType } from '@/utility';

export const Export = new Action({
  fn: () => {
    const nodes = document.querySelectorAll(
      [
        'button',
        'label',
        'input',
        'select',
        'textarea',
        'legend',
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
      // Check for existing label
      if (element.getAttribute('aria-label')) return;

      // Get best text for label.
      const text = Aria.getElementText({ element });
      // Set value.
      Utility.setNodeValue({
        node: element,
        type: DOMValueType.Attribute,
        name: 'aria-label',
        value: text
      });
    });
  },
  name: 'AddAriaLabels'
});

export default Export;
