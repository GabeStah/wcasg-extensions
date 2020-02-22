declare enum DOMValueType {
    Attribute = "attribute",
    Style = "style",
    Property = "property"
}
export declare const Data: {
    /**
     * Add data attributes to Nodes using original property value.
     */
    createOriginalDataAttribute: ({ node, name, type }: {
        node: any;
        name: string | string[];
        type: DOMValueType;
    }) => void;
    /**
     * Get custom data attribute name for property.
     * @returns {string}
     */
    generateDataAttributeName({ name, type }: {
        name: string;
        type: DOMValueType;
    }): string;
};
export default Data;
