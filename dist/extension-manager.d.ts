import { Extension } from 'types/extension';
interface IExtensionParams {
    extensions: Extension[];
    logging?: boolean;
}
export declare class ExtensionManager {
    _extensions: Extension[];
    logging: boolean;
    constructor(params: IExtensionParams);
    get extensions(): Extension[];
    add(extension: Extension): void;
    log(message: string): void;
    runExtensions(): void;
}
export {};
