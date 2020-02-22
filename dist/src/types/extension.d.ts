import { ActionFunction } from 'types/function';
import { Predicate } from 'types/predicate';
export declare type ActionFunctionType = null | ActionFunction | Array<ActionFunction>;
export interface IExtension {
    action: ActionFunctionType;
    firedAt?: Date | null;
    name: string;
    predicate?: Predicate | Array<Predicate>;
    beforeLoad?: ActionFunctionType;
    afterLoad?: ActionFunctionType;
    beforeExecute?: ActionFunctionType;
    afterExecute?: ActionFunctionType;
    beforeWidgetLoad?: ActionFunctionType;
    afterWidgetLoad?: ActionFunctionType;
    beforeWidgetExecute?: ActionFunctionType;
    afterWidgetExecute?: ActionFunctionType;
}
export interface IExtensionsParams {
    action: ActionFunctionType;
    name?: string;
    predicate?: Predicate | Array<Predicate>;
}
export declare class Extension implements IExtension {
    action: ActionFunctionType;
    firedAt?: Date | null;
    name: string;
    predicate?: Predicate | Array<Predicate>;
    constructor(params: IExtensionsParams);
    predicatesPassed(): boolean;
    run(): Date | void;
    runPredicates(): boolean;
}
