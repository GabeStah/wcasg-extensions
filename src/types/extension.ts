// Load: When extension is first loaded into page.
// Execute: When extension function is executed.
// WidgetLoad: When plugins load
// PluginExecute: When plugins fire
import { ActionFunction } from 'types/function';
import { Action } from 'types/action';
import { Predicate } from 'types/predicate';
import Logger from '@/logger';

export type ActionFunctionType = null | ActionFunction | Array<ActionFunction>;

export interface IExtension {
  // Actual extension actions to perform.
  action: Action | Array<Action>;

  // Description of what the extension does.
  description: string;

  // Enabled
  enabled: boolean;

  // Timestamp when extension fired, if applicable.
  firedAt?: Date | null;

  name: string;

  // Zero or more functions that must be true to execute extension.
  predicate?: Predicate | Array<Predicate>;

  // Before extension load
  beforeLoad?: ActionFunctionType;
  // After extension load
  afterLoad?: ActionFunctionType;

  // Before execute
  beforeExecute?: ActionFunctionType;
  // After execute
  afterExecute?: ActionFunctionType;

  // Before widget load
  beforeWidgetLoad?: ActionFunctionType;
  // After widget load
  afterWidgetLoad?: ActionFunctionType;

  // Before load
  beforeWidgetExecute?: ActionFunctionType;
  // After load
  afterWidgetExecute?: ActionFunctionType;
}

export interface IExtensionsParams {
  action: Action | Array<Action>;
  description: string;
  enabled?: boolean;
  name?: string;
  predicate?: Predicate | Array<Predicate>;
}

export class Extension implements IExtension {
  action: Action | Array<Action>;
  description: string = '';
  enabled: boolean = true;
  firedAt?: Date | null;
  name: string = '';
  predicate?: Predicate | Array<Predicate>;

  constructor(params: IExtensionsParams) {
    this.action = params.action;
    this.description = params.description;
    this.enabled = params.enabled !== undefined ? params.enabled : true;
    this.name = params.name ? params.name : '';
    this.predicate = params.predicate;
  }

  predicatesPassed(): boolean {
    if (!this.predicate) return false;
    if (Array.isArray(this.predicate)) {
      for (const predicate of this.predicate) {
        if (!predicate.passedAt) {
          Logger.log(`  Predicate '${predicate.name}' failed.`);
          return false;
        }
      }
    } else {
      if (!this.predicate.passedAt) {
        Logger.log(`  Predicate '${this.predicate.name}' failed.`);
        return false;
      }
    }
    return true;
  }

  execute(): Date | void {
    this.runPredicates();
    if (!this.predicatesPassed()) {
      Logger.warn(`  Predicate(s) failed, cancelling.`);
      return;
    }

    this.firedAt = null;
    Logger.log(`  Predicates passed, running actions.`);
    this.runActions();
    this.firedAt = new Date();
    return this.firedAt;
  }

  runActions(): boolean {
    if (!this.action) return false;
    if (Array.isArray(this.action)) {
      this.action.forEach((action: Action) => {
        action.run();
      });
    } else {
      this.action.run();
    }
    return true;
  }

  runPredicates(): boolean {
    if (!this.predicate) return false;
    if (Array.isArray(this.predicate)) {
      this.predicate.forEach((predicate: Predicate) => {
        predicate.run();
      });
    } else {
      this.predicate.run();
    }
    return true;
  }

  toJson(): string {
    return JSON.stringify(this.toObject());
  }

  toObject(): any {
    let actions: any = [];
    let predicates: any = [];
    if (this.action) {
      if (Array.isArray(this.action)) {
        actions = this.action.map(action => action.toJson());
      } else {
        actions.push(this.action.toJson());
      }
    }

    if (this.predicate) {
      if (Array.isArray(this.predicate)) {
        predicates = this.predicate.map(predicate => predicate.toJson());
      } else {
        predicates.push(this.predicate.toJson());
      }
    }

    let obj: any = {
      description: this.description,
      enabled: this.enabled,
      firedAt: this.firedAt,
      name: this.name
    };

    if (actions.length > 0) {
      obj.action = actions;
    }

    if (predicates.length > 0) {
      obj.predicate = predicates;
    }

    return obj;
  }

  toString(): string {
    return JSON.stringify(this.toObject());
  }
}
