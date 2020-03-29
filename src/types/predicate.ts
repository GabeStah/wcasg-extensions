// Load: When extension is first loaded into page.
// Execute: When extension function is executed.
// WidgetLoad: When plugins load
// PluginExecute: When plugins fire
import { PredicateFunction } from 'types/function';
import LZString from 'lz-string';

export type PredicateFunctionType = null | PredicateFunction | Function;

export interface IPredicate {
  // Actual extension actions to perform.
  fn: PredicateFunctionType;

  name: string;

  // Passed timestamp, if applicable.
  passedAt?: Date | null;

  // Before extension load
  beforeLoad?: PredicateFunctionType;
  // After extension load
  afterLoad?: PredicateFunctionType;

  // Before execute
  beforeExecute?: PredicateFunctionType;
  // After execute
  afterExecute?: PredicateFunctionType;

  // Before widget load
  beforeWidgetLoad?: PredicateFunctionType;
  // After widget load
  afterWidgetLoad?: PredicateFunctionType;

  // Before load
  beforeWidgetExecute?: PredicateFunctionType;
  // After load
  afterWidgetExecute?: PredicateFunctionType;
}

export interface IPredicateParams {
  fn: PredicateFunctionType;
  name?: string;
}

export class Predicate implements IPredicate {
  fn: PredicateFunctionType;
  name: string = '';
  passedAt?: Date | null;

  constructor(params: IPredicateParams) {
    this.fn = params.fn;
    this.name = params.name ? params.name : '';
  }

  run(): Date | void {
    if (!this.fn) return;
    this.passedAt = null;
    if (!this.fn()) {
      return;
    }
    this.passedAt = new Date();
    return this.passedAt;
  }

  toJson(): object {
    const obj: any = {
      name: this.name,
      passedAt: this.passedAt
    };

    if (this.fn) {
      obj.fn = LZString.compressToBase64(String(this.fn));
    }

    return obj;
  }
}
