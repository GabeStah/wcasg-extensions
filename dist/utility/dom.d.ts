export declare const Dom: {
    getFocusedNode: () => Element | null;
    isFocusedNodeInputField: () => HTMLTextAreaElement | HTMLInputElement | undefined;
    /**
     * Constructs new element text value based on current value.
     * Inserts new value text into location of cursor, if applicable.
     * If element has active selection text, value inserted in place of selection.
     *
     * @param {HTMLTextAreaElement | HTMLInputElement} element
     * @param {string | undefined} value
     * @returns {string}
     */
    insertTextIntoInputElement: ({ element, value }: {
        element: HTMLTextAreaElement | HTMLInputElement;
        value: string | undefined;
    }) => string;
    /**
     * Emulates 'Backspace' key press for passed input element.
     *
     * @param {HTMLTextAreaElement | HTMLInputElement} element
     * @returns {string}
     */
    simulateBackspaceInInputElement: (element: HTMLTextAreaElement | HTMLInputElement) => string;
    /**
     * Emulates 'Delete' key press for passed input element.
     *
     * @param {HTMLTextAreaElement | HTMLInputElement} element
     * @returns {string}
     */
    simulateDeleteInInputElement: (element: HTMLTextAreaElement | HTMLInputElement) => string;
    simulateTabInInputElement: (element: HTMLTextAreaElement | HTMLInputElement) => void;
};
export default Dom;
