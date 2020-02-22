import { PredicateFunction } from 'types/function';
export declare type PredicateFunctionType = null | PredicateFunction | Array<PredicateFunction>;
export interface IPredicate {
    fn: PredicateFunctionType;
    logging: boolean;
    name: string;
    passedAt?: Date | null;
    beforeLoad?: PredicateFunctionType;
    afterLoad?: PredicateFunctionType;
    beforeExecute?: PredicateFunctionType;
    afterExecute?: PredicateFunctionType;
    beforeWidgetLoad?: PredicateFunctionType;
    afterWidgetLoad?: PredicateFunctionType;
    beforeWidgetExecute?: PredicateFunctionType;
    afterWidgetExecute?: PredicateFunctionType;
}
export interface IPredicateParams {
    fn: PredicateFunctionType;
    logging?: boolean;
    name?: string;
}
export declare class Predicate implements IPredicate {
    fn: PredicateFunctionType;
    logging: boolean;
    name: string;
    passedAt?: Date | null;
    constructor(params: IPredicateParams);
    run(): Date | void;
}
