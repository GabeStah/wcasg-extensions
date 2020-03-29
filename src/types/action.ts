import { ActionFunction } from 'types/function';
import LZString from 'lz-string';
import Logger from '@/logger';

export type ActionFunctionType = null | ActionFunction | Function;

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
    this.fn();
    return true;
  }

  toJson(): object {
    const obj: any = {
      name: this.name
    };

    if (this.fn) {
      obj.fn = LZString.compressToBase64(String(this.fn));
    }

    return obj;
  }
}
