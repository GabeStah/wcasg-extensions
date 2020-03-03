export declare enum DOMValueType {
    Attribute = "attribute",
    Style = "style",
    Property = "property"
}
declare const Utility: {
    /**
     * Converts bytes into larger readable format.
     *
     * @source https://gist.github.com/lanqy/5193417
     * @param {number} bytes
     * @returns {string}
     */
    bytesToSize: (bytes: number) => string;
    /**
     * Deep diff between two object, using lodash
     *
     * @source https://gist.github.com/Yimiprod/7ee176597fef230d1451
     * @param  {Object} object Object compared
     * @param  {Object} base   Object to compare with
     * @return {Object}        Return a new object who represent the diff
     */
    difference: (object: any, base: any) => any;
    /**
     * Get value by name and ValueType of specified node.
     *
     * @param {NodeList | Element | any} node
     * @param {string} name
     * @param {DOMValueType} type
     * @returns {string | void}
     */
    getNodeValue: ({ node, name, type }: {
        node: any;
        name: string;
        type: DOMValueType;
    }) => string;
    /**
     * Generates a psuedo-random guid.
     * @returns {string}
     */
    generateGuid: (length?: number) => string;
    getNodeListFromQuery(query: string): NodeList;
    /**
     * Get value by name and ValueType of specified node.
     *
     * @param {NodeList | Element | any} node
     * @param {string} name
     * @param {DOMValueType} type
     * @returns {string | void}
     */
    removeNodeValue: ({ node, name, type }: {
        node: any;
        name: string;
        type: DOMValueType;
    }) => void;
    /**
     * Set node value via name and ValueType.
     *
     * @param {NodeList | Element | any} node
     * @param {string} name
     * @param {DOMValueType} type
     * @param value
     * @param priority
     * @returns {string | void}
     */
    setNodeValue: ({ node, name, type, value, priority }: {
        node: any;
        name: string;
        type: DOMValueType;
        value: any;
        priority?: string | undefined;
    }) => void;
    throwError: (message: string) => void;
};
export default Utility;
