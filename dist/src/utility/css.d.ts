export declare const CSS_UNIT_TYPE_REGEX: RegExp;
export declare const Css: {
    /**
     * Adds class(es) to node(s).
     * IE compatible.
     *
     * @param node
     * @param name
     */
    addClass: ({ node, name }: {
        node: any;
        name: string | string[];
    }) => void;
    getUnitType: (value: string) => any;
    /**
     * Determines if node has class.
     * IE compatible.
     *
     * @param node
     * @param name
     * @returns {boolean}
     */
    hasClass: ({ node, name }: {
        node: any;
        name: string;
    }) => any;
    /**
     * Removes class(es) from node(s).
     * IE compatible.
     *
     * @param node
     * @param name
     */
    removeClass: ({ node, name }: {
        node: any;
        name: string | string[];
    }) => void;
    /**
     * Removes CSSStyleDeclaration style value.
     * @param {any} element
     * @param {string} property
     */
    removeStyle: ({ element, name }: {
        element: any;
        name: string;
    }) => void;
    /**
     * Get all nodes with matching class name.
     *
     * @param {string} name
     * @returns {any}
     */
    selectAllWithClass: ({ name }: {
        name: string;
    }) => any;
    /**
     * Sets CSSStyleDeclaration style value.
     * @param {any} element
     * @param {string} property
     * @param {any} value
     */
    setStyle: ({ element, name, value }: {
        element: any;
        name: string;
        value: any;
    }) => void;
};
export default Css;
