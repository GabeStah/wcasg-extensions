# WCASG Extensions Package

## Predicate

- [Predicate Model](src/types/predicate.ts#L47)

A `Predicate` is a model with one or more functions that return a boolean value. An `Extension` is (optionally) assigned predicates, the results of which determine if the extension's `action(s)` should be executed.

Simple predicate examples include checking if the current date/time falls after a specific timestamp, whether a given Widget plugin is enabled, or of the base page has Wordpress running.

A predicate's `fn` property should be one or more very simple, immutable functions. For example, here's the entire code of the [`HasBootstrap`](src/predicates/HasBootstrap.ts) predicate:

```ts
import { Predicate } from 'types/predicate';

/**
 * Determine if Bootstrap is running.
 */
export const HasBootstrap = new Predicate({
  fn: () => !!window['bootstrap'],
  name: 'HasBootstrap'
});

export default HasBootstrap;
```

## Extension

- [Extension Model](src/types/extension.ts#L50)

An `extension` is a basic model that defines one or more `action` functions that are executed to perform an arbitrary action, such as execute JS, change CSS, etc. An extension can be (optionally) assigned one or more predicates, the truthiness of which determine if the extension is valid and its action is to be executed.

For example, here is the code of the [`css/bootstrap/AddScreenReaderOnlyClasses`](src/extensions/css/bootstrap/AddScreenReaderOnlyClasses.ts) extension, which adds `sr-only` and `sr-only-focusable` classes to a collection of DOM element types. Since these classes are from Bootstrap, it uses the above `HasBootstrap` predicate to determine validity.

```ts
import { Extension } from 'types/extension';
import HasBootstrap from 'predicates/HasBootstrap';
import Css from '@/utility/css';

export const AddScreenReaderOnlyClasses = new Extension({
  action: () => {
    const nodes = document.querySelectorAll(
      [
        'button',
        'label',
        'input',
        'span',
        'a',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ].join(', ')
    );
    if (!nodes || nodes.length === 0) return;

    nodes.forEach((element: Element) => {
      // sr-only
      if (!Css.hasClass({ node: element, name: 'sr-only' })) {
        Css.addClass({ node: element, name: 'sr-only' });
      }
      // sr-only-focusable
      if (!Css.hasClass({ node: element, name: 'sr-only-focusable' })) {
        Css.addClass({ node: element, name: 'sr-only-focusable' });
      }
    });
  },
  name: 'AddScreenReaderOnlyClasses',
  predicate: HasBootstrap
});

export default AddScreenReaderOnlyClasses;
```

## Development

1. Make changes to code.
2. Run `yarn run build` or `yarn run watch`.

### Adding to WCASG Widget App

1. Navigate to root `wcasg-ada-app-extensions` directory.
2. Run `yarn link`.
3. Navigate to root `wcasg-ada-app` directory.
4. Run `yarn link wcasg-ada-app-extensions` to create local symbolic link.
5. Import extensions package anywhere: `import Extensions from 'wcasg-ada-app-extensions';`
6. Execute all extensions in code with: `Extensions.manager.runExtensions();`.
7. Rebuild `wcasg-ada-app` with `yarn run build`.

## Creating a New Extension

1. Add a new file under `src/extensions`. Demo files are roughly organized under framework-specific directories.
2. Create a `new Extension()` instance and pass an object with an `action` property equal to a single function, or an array of functions:

```ts
export const MyExtension = new Extension({
  action: () => console.log('stuff')
});
// or
export const MyExtension = new Extension({
  action: [() => console.log('stuff'), () => console.log('other stuff')]
});
```

3. (Optionally) Add a `name` property to help identify the extension in log outputs.
4. (Optionally) Add a `predicate` property assigned to a `new Predicate()` instance, or an array of predicates:

```ts
export const MyExtension = new Extension({
  action: () => console.log('stuff'),
  name: 'MyExtensionName'
  predicate: MyPredicate
})
// or
export const MyExtension = new Extension({
  action: () => console.log('stuff'),
  name: 'MyExtensionName'
  predicate: [MyPredicate, MyOtherPredicate]
})
```

5. Add the extension to the `ExtensionManager` you're using. At present it's a single instance exported in the public package API, so just add your extension to the `extensions` property array:

```ts
import { ExtensionManager } from './extension-manager';
import MyExtension from 'extensions/js/MyExtension';

const extensions = (function() {
  return {
    manager: new ExtensionManager({
      extensions: [MyExtension]
    })
  };
})();

export default extensions;
```

6. Finally, just rebuild the project and any dependency projects (i.e. `wcasg-ada-app`). When the Widget loads it will iterate through all extensions and execute all actions for which the predicates passed, if applicable.
