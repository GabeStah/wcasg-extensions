// Load: When extension is first loaded into page.
// Execute: When extension function is executed.
// WidgetLoad: When plugins load
// PluginExecute: When plugins fire
import { PredicateFunction } from 'types/function';

export type PredicateFunctionType =
  | null
  | PredicateFunction
  | Array<PredicateFunction>;

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
    if (Array.isArray(this.fn)) {
      for (const fn of this.fn) {
        if (!fn()) {
          return;
        }
      }
    } else {
      if (!this.fn()) {
        return;
      }
    }
    this.passedAt = new Date();
    return this.passedAt;
  }
}
