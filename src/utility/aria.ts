import Utility from '@/utility';
import Css from '@/utility/css';

enum DOMValueType {
  Attribute = 'attribute',
  Style = 'style',
  Property = 'property'
}

export const Aria = {
  /**
   * Get the preferred text value for a passed Element, searching in order of importance:
   * aria-label > aria-labelledby > aria-value-text > textContent > href
   *
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-label
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuetext
   *
   * @param element - Element to parse.
   * @param {number} [maxLength] - Maximum text length to return.
   */
  getElementText: ({
    element,
    maxLength
  }: {
    element: any;
    maxLength?: number;
  }): string => {
    if (!element) {
      return '';
    }

    const values: any = [];

    const label = Utility.getNodeValue({
      node: element,
      name: 'aria-label',
      type: DOMValueType.Attribute
    });
    if (label) {
      values.push(label);
    }

    const labelledBy = Utility.getNodeValue({
      node: element,
      name: 'aria-labelledby',
      type: DOMValueType.Attribute
    });
    if (labelledBy) {
      if (document.getElementById(labelledBy)) {
        const labelOfLabelledBy = Aria.getElementText({
          element: document.getElementById(labelledBy),
          maxLength
        });
        if (labelOfLabelledBy) {
          values.push(labelOfLabelledBy);
        }
      }
    }

    const valueText = Utility.getNodeValue({
      node: element,
      name: 'aria-valuetext',
      type: DOMValueType.Attribute
    });
    if (valueText) {
      values.push(valueText);
    }

    const altText = Utility.getNodeValue({
      node: element,
      name: 'alt',
      type: DOMValueType.Attribute
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
  }
};

export default Aria;
