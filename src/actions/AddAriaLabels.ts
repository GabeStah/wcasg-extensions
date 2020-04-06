import { Action } from 'types/action';

export const Export = new Action({
  fn: () => {
    const getNodeValue = ({ node, name, type }) => {
      if (type === 'attribute') {
        return node.getAttribute(name);
      }

      if (type === 'property') {
        return node[name];
      }

      if (type === 'style') {
        const value = node.style.getPropertyValue(name);
        if (value && value !== '') {
          return value;
        }
        return window.getComputedStyle(node).getPropertyValue(name);
      }

      return '';
    };

    const getElementText = ({ element, maxLength = undefined }) => {
      if (!element) {
        return '';
      }

      const values: any = [];

      const label = getNodeValue({
        node: element,
        name: 'aria-label',
        type: 'attribute'
      });
      if (label) {
        values.push(label);
      }

      const labelledBy = getNodeValue({
        node: element,
        name: 'aria-labelledby',
        type: 'attribute'
      });
      if (labelledBy) {
        if (document.getElementById(labelledBy)) {
          const labelOfLabelledBy = getElementText({
            element: document.getElementById(labelledBy),
            maxLength
          });
          if (labelOfLabelledBy) {
            values.push(labelOfLabelledBy);
          }
        }
      }

      const valueText = getNodeValue({
        node: element,
        name: 'aria-valuetext',
        type: 'attribute'
      });
      if (valueText) {
        values.push(valueText);
      }

      const altText = getNodeValue({
        node: element,
        name: 'alt',
        type: 'attribute'
      });
      if (altText) {
        values.push(altText);
      }

      const text = element.textContent;
      if (text) {
        values.push(text);
      }

      const href = element.href;
      if (href) {
        values.push(href);
      }

      // Return first element.
      return values.length > 0 ? String(values[0]).substring(0, maxLength) : '';
    };

    const setNodeValue = ({
      node,
      name,
      type,
      value,
      priority = undefined
    }) => {
      if (type === 'attribute') {
        node.setAttribute(name, value);
      }

      if (type === 'property') {
        node[name] = value;
      }

      if (type === 'style') {
        node.style.setProperty(name, value, priority);
      }
    };

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
      const text = getElementText({ element });
      // Set value.
      setNodeValue({
        node: element,
        type: 'attribute',
        name: 'aria-label',
        value: text
      });
    });
  },
  name: 'Add Aria Labels'
});

export default Export;
