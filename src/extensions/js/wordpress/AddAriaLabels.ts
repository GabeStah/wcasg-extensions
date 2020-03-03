import { Extension } from 'types/extension';
import HasWordpress from 'predicates/HasWordpress';
import Aria from '@/utility/aria';
import Utility, { DOMValueType } from '@/utility';

export const AddMissingAriaLabels = new Extension({
  action: () => {
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
  description:
    "Adds missing 'aria-label' attributes with most relevant text value to all buttons, labels, and primary text elements.",
  name: 'AddMissingAriaLabels',
  predicate: [HasWordpress]
});

export default AddMissingAriaLabels;
