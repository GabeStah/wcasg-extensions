import { Extension } from 'types/extension';
interface IExtensionParams {
    extensions: Extension[];
}
export declare class ExtensionManager {
    _extensions: Extension[];
    constructor(params: IExtensionParams);
    get extensions(): Extension[];
    add(extension: Extension): void;
    runExtensions(): void;
}
export {};
