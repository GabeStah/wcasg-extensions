import { Extension } from 'types/extension';
interface IExtensionManager {
    _extensions: Extension[];
    _imports: any[];
}
interface IExtensionParams {
    extensions: Extension[];
}
export declare class ExtensionManager implements IExtensionManager {
    _extensions: Extension[];
    _imports: any[];
    constructor(params: IExtensionParams);
    get extensions(): Extension[];
    get imports(): any[];
    set imports(value: any[]);
    add(extension: Extension): void;
    addImports(extensions: any[]): void;
    processCustomImports(): void;
    processBuiltInImports(): void;
    /**
     * Run all 'enabled' Extensions.
     */
    executeExtensions(): void;
}
export {};
