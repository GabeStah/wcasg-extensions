// Load: When extension is first loaded into page.
// Execute: When extension function is executed.
// WidgetLoad: When plugins load
// PluginExecute: When plugins fire
import { ActionFunction } from 'types/function';
import { Predicate } from 'types/predicate';
import Logger from '@/logger';

export type ActionFunctionType = null | ActionFunction | Array<ActionFunction>;

export interface IExtension {
  // Actual extension actions to perform.
  action: ActionFunctionType;

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
  action: ActionFunctionType;
  description: string;
  enabled?: boolean;
  name?: string;
  predicate?: Predicate | Array<Predicate>;
}

export class Extension implements IExtension {
  action: ActionFunctionType;
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
      this.predicate.forEach((predicate: Predicate) => {
        if (!predicate.passedAt) {
          Logger.log(`  Predicate '${predicate.name}' failed.`);
          return false;
        }
      });
    } else {
      if (!this.predicate.passedAt) {
        Logger.log(`  Predicate '${this.predicate.name}' failed.`);
        return false;
      }
    }
    return true;
  }

  run(): Date | void {
    if (!this.action) return;
    if (!this.predicatesPassed()) return;
    this.firedAt = null;
    if (Array.isArray(this.action)) {
      this.action.forEach((action: ActionFunction) => {
        action();
      });
    } else {
      this.action();
    }
    this.firedAt = new Date();
    return this.firedAt;
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
    return this;
  }
}
