import { Extension } from 'types/extension';
import Logger from '@/logger';

interface IExtensionParams {
  extensions: Extension[];
}

export class ExtensionManager {
  _extensions: Extension[] = [];
  constructor(params: IExtensionParams) {
    this._extensions = params.extensions;
  }

  get extensions(): Extension[] {
    return this._extensions;
  }

  add(extension: Extension) {
    this.extensions.push(extension);
  }

  runExtensions() {
    this.extensions.forEach((extension: Extension, index: number) => {
      Logger.log(
        `Executing '${extension.name ? extension.name : index}' extension.`
      );
      extension.runPredicates();
      if (extension.predicatesPassed()) {
        Logger.log(`  Predicates passed, running actions.`);
        extension.run();
      } else {
        Logger.warn(`  Predicate(s) failed, cancelled`);
      }
    });
  }
}
