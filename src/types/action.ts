import { ActionFunction } from 'types/function';
import Logger from '@/logger';

export type ActionFunctionType =
  | null
  | ActionFunction
  | Array<ActionFunction>
  | Function;

export interface IAction {
  fn: ActionFunctionType;

  name: string;
}

export interface IActionParams {
  fn: ActionFunctionType;
  name?: string;
}

export class Action implements IAction {
  fn: ActionFunctionType;
  name: string = '';

  constructor(params: IActionParams) {
    this.fn = params.fn;
    this.name = params.name ? params.name : '';
  }

  run(): boolean {
    if (!this.fn) return false;
    Logger.log(`  Running '${this.name}' action.`);
    if (Array.isArray(this.fn)) {
      for (const fn of this.fn) {
        fn();
      }
    } else {
      this.fn();
    }
    return true;
  }
}
