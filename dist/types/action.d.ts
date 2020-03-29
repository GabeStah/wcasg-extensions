import { ActionFunction } from 'types/function';
export declare type ActionFunctionType = null | ActionFunction | Function;
export interface IAction {
    fn: ActionFunctionType;
    name: string;
}
export interface IActionParams {
    fn: ActionFunctionType;
    name?: string;
}
export declare class Action implements IAction {
    fn: ActionFunctionType;
    name: string;
    constructor(params: IActionParams);
    run(): boolean;
    toJson(): object;
}
