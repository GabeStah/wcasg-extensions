export declare const Aria: {
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
    getElementText: ({ element, maxLength }: {
        element: any;
        maxLength?: number | undefined;
    }) => string;
};
export default Aria;
