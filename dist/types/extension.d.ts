import { ActionFunction } from 'types/function';
import { Action } from 'types/action';
import { Predicate } from 'types/predicate';
export declare type ActionFunctionType = null | ActionFunction | Array<ActionFunction>;
export interface IExtension {
    action: Action | Array<Action>;
    description: string;
    enabled: boolean;
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
    action: Action | Array<Action>;
    description: string;
    enabled?: boolean;
    name?: string;
    predicate?: Predicate | Array<Predicate>;
}
export declare class Extension implements IExtension {
    action: Action | Array<Action>;
    description: string;
    enabled: boolean;
    firedAt?: Date | null;
    name: string;
    predicate?: Predicate | Array<Predicate>;
    constructor(params: IExtensionsParams);
    predicatesPassed(): boolean;
    execute(): Date | void;
    runActions(): boolean;
    runPredicates(): boolean;
    toJson(): string;
    toObject(): any;
}
