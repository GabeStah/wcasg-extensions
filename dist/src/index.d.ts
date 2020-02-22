import { ExtensionManager } from './extension-manager';
declare const extensions: {
    publicVar: number;
    sum: (a: any, b: any) => any;
    multiply: (a: any, b: any) => number;
    divide: (a: any, b: any) => number;
    manager: ExtensionManager;
};
export default extensions;
