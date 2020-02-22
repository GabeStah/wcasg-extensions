/**
 * Determine if two numbers are effectively equivalent using precision.
 *
 * @param {number | string} a
 * @param {number | string} b
 * @param {number} precision
 * @returns {boolean}
 */
export declare const areEqual: (a: string | number, b: string | number, precision?: number) => boolean;
export declare const lessThan: (a: string | number, b: string | number, precision?: number) => boolean;
export declare const lessThanOrEqual: (a: string | number, b: string | number, precision?: number) => boolean;
export declare const greaterThan: (a: string | number, b: string | number, precision?: number) => boolean;
export declare const greaterThanOrEqual: (a: string | number, b: string | number, precision?: number) => boolean;
/**
 * Round a number to precision number of significant digits.
 *
 * @param {number | string} value
 * @param {number} precision
 * @returns {number}
 */
export declare const round: (value: string | number, precision?: number) => number;
