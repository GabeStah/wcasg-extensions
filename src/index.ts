import { ExtensionManager } from './extension-manager';
import DisableAnimations from 'extensions/js/jquery/DisableAnimations';
import AddMissingAriaLabels from 'extensions/js/wordpress/AddAriaLabels';
import AddScreenReaderOnlyClasses from 'extensions/css/bootstrap/AddScreenReaderOnlyClasses';

const extensions = (function() {
  return {
    manager: new ExtensionManager({
      extensions: [
        AddMissingAriaLabels,
        AddScreenReaderOnlyClasses,
        DisableAnimations
      ]
    })
  };
})();

export default extensions;
