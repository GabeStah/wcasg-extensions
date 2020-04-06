import { Action } from 'types/action';

/**
 * Add screen reader classes.
 */
export const Export = new Action({
  fn: () => {
    const addClass = ({ node, name }) => {
      if (node instanceof NodeList) {
        node.forEach(nodeValue => addClass({ node: nodeValue, name }));
        return;
      }
      if (Array.isArray(name)) {
        name.forEach(nameValue => addClass({ node, name: nameValue }));
        return;
      }
      if (node.classList) {
        node.classList.add(name);
      } else if (!hasClass({ node, name })) {
        node.className += ' ' + name;
      }
    };

    const hasClass = ({ node, name }) => {
      if (node.classList) {
        return node.classList.contains(name);
      } else {
        return !!node.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
      }
    };

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
      if (!hasClass({ node: element, name: 'sr-only' })) {
        addClass({ node: element, name: 'sr-only' });
      }
      // sr-only-focusable
      if (!hasClass({ node: element, name: 'sr-only-focusable' })) {
        addClass({ node: element, name: 'sr-only-focusable' });
      }
    });
  },
  name: 'Add Sr Classes'
});

export default Export;
