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

  addImports(extensions: any[]) {
    this.imports = extensions;
  }

  processCustomImports() {
    this.imports
      .filter((extension: any) => !extension.imported)
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

          // Check that no matching extension exists
          const match = this.extensions.find(
            (extension: Extension) => extension.name === name
          );
          if (!match) {
            Logger.log(`Importing custom '${name}' extension.`);

            const actionCollection: Action[] = [];
            if (actions) {
              actions.forEach((action: any) => {
                actionCollection.push(
                  new Action({
                    fn: Function(
                      LZString.decompressFromBase64(action.function)
                    ),
                    name: action.name
                  })
                );
              });
            }

            const predicateCollection: Predicate[] | null = [];
            if (predicates) {
              predicates.forEach((predicate: any) => {
                predicateCollection.push(
                  new Predicate({
                    fn: Function(
                      LZString.decompressFromBase64(predicate.function)
                    ),
                    name: predicate.name
                  })
                );
              });
            }

            const extension = new Extension({
              action: actionCollection,
              description: description,
              enabled: enabledBySite,
              name: name,
              predicate: predicates ? predicateCollection : undefined
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
