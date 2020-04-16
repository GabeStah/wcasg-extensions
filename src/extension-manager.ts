import { Extension } from 'types/extension';
import Logger from '@/logger';
import { Predicate } from 'types/predicate';
import LZString from 'lz-string';
import DateUtility from '@/utility/date';
import { Action } from 'types/action';

interface IExtensionManager {
  _extensions: Extension[];
  _imports: any[];
}

interface IExtensionParams {
  extensions: Extension[];
}

export class ExtensionManager implements IExtensionManager {
  _extensions: Extension[] = [];
  _imports: any[] = [];
  constructor(params: IExtensionParams) {
    this._extensions = params.extensions;
  }

  get extensions(): Extension[] {
    return this._extensions;
  }

  get imports(): any[] {
    return this._imports;
  }

  set imports(value) {
    this._imports = value;
  }

  add(extension: Extension) {
    this.extensions.push(extension);
  }

  addImports(extensions: any[], purgeExisting: boolean = false) {
    if (purgeExisting) {
      this._extensions = [];
    }
    this.imports = extensions;
  }

  processCustomImports() {
    this.imports
      // .filter((extension: any) => !extension.imported)
      .forEach(
        ({
          name,
          description,
          enabled,
          pivot,
          actions,
          predicates
        }: {
          name: string;
          description: string;
          enabled: boolean;
          pivot: any;
          actions: any;
          predicates: any;
        }) => {
          const { enabled_at } = pivot;
          let enabledBySite = false;
          if (enabled_at) {
            enabledBySite =
              enabled_at && DateUtility.getUTCDate(enabled_at) <= new Date();
          }

          Logger.log(`Importing '${name}' extension.`);

          const actionCollection: Action[] = [];
          if (actions) {
            actions.forEach((action: any) => {
              let func = LZString.decompressFromBase64(action.function);

              if (typeof func !== 'function') {
                if (func.trim().startsWith('function')) {
                  func = func.substring(
                    func.indexOf('{') + 1,
                    func.lastIndexOf('}')
                  );
                }
                // Convert to function
                func = Function(func);
              }

              actionCollection.push(
                new Action({
                  fn: func,
                  name: action.name
                })
              );
            });
          }

          // Check for function string
          // regex: function\s+\w+\(\)\s*{
          // t.trim().startsWith('function')
          // Function(t.substring(t.indexOf("{") + 1, t.lastIndexOf("}")))()

          const predicateCollection: Predicate[] | null = [];
          if (predicates) {
            predicates.forEach((predicate: any) => {
              let func = LZString.decompressFromBase64(predicate.function);
              if (typeof func !== 'function') {
                if (func.trim().startsWith('function')) {
                  func = func.substring(
                    func.indexOf('{') + 1,
                    func.lastIndexOf('}')
                  );
                }
                // Convert to function
                func = Function(func);
              }

              const newPredicate = new Predicate({
                fn: func,
                name: predicate.name
              });

              predicateCollection.push(newPredicate);
            });
          }

          // Check for matching extension
          const match = this.extensions.find(
            (extension: Extension) => extension.name === name
          );

          if (match) {
            // Update existing
            match.action = actionCollection;
            match.description = description;
            match.enabled = enabledBySite;
            match.predicate = predicateCollection;
          } else {
            // Create new
            const extension = new Extension({
              action: actionCollection,
              description: description,
              enabled: enabledBySite,
              name: name,
              predicate: predicateCollection
            });

            this.add(extension);
          }
        }
      );
  }

  processBuiltInImports() {
    this.imports
      .filter((extension: any) => extension.imported === true)
      .forEach(({ name, pivot }: { name: string; pivot: any }) => {
        const { enabled_at } = pivot;
        let enabledBySite = false;
        if (enabled_at) {
          enabledBySite =
            enabled_at && DateUtility.getUTCDate(enabled_at) <= new Date();
        }

        // Check for matching name
        const match = this.extensions.find(
          (extension: Extension) => extension.name === name
        );
        if (match && match.enabled !== enabledBySite) {
          Logger.log(
            `${enabledBySite ? 'Enabling' : 'Disabling'} built-in '${
              match.name
            }' extension (site override).`
          );
          match.enabled = enabledBySite;
        }
      });
  }

  /**
   * Run all 'enabled' Extensions.
   */
  executeExtensions() {
    this.extensions
      .filter((extension: Extension) => extension.enabled)
      .forEach((extension: Extension, index: number) => {
        Logger.log(
          `Executing '${extension.name ? extension.name : index}' extension.`
        );
        extension.execute();
      });
  }
}
