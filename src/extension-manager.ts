import { Extension } from 'types/extension';
import Logger from '@/logger';

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
    extensions.forEach(
      ({
        name,
        imported,
        pivot
      }: {
        name: string;
        enabled: boolean;
        imported: boolean;
        pivot: any;
      }) => {
        const { enabled_at } = pivot;
        let enabledBySite = false;
        if (enabled_at) {
          enabledBySite = enabled_at && new Date(enabled_at) <= new Date();
        }

        // Check for matching name
        const match = this.extensions.find(
          (extension: Extension) => extension.name === name
        );
        if (match && match.enabled !== enabledBySite) {
          Logger.log(
            `${enabledBySite ? 'Enabling' : 'Disabling'} built-in ${
              match.name
            } extension (site override).`
          );
          match.enabled = enabledBySite;
        }
      }
    );
  }

  /**
   * Run all 'enabled' Extensions.
   */
  runExtensions() {
    this.extensions
      .filter((extension: Extension) => extension.enabled)
      .forEach((extension: Extension, index: number) => {
        Logger.log(
          `Executing '${extension.name ? extension.name : index}' extension.`
        );
        extension.runPredicates();
        if (extension.predicatesPassed()) {
          Logger.log(`  Predicates passed, running actions.`);
          extension.run();
        } else {
          Logger.warn(`  Predicate(s) failed, cancelling.`);
        }
      });
  }
}
