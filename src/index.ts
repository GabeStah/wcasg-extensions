import { ExtensionManager } from './extension-manager';
import AddMissingAriaLabels from 'extensions/js/wordpress/AddAriaLabels';
import AddScreenReaderOnlyClasses from 'extensions/css/bootstrap/AddScreenReaderOnlyClasses';
import DisableAnimations from 'extensions/js/jquery/DisableAnimations';

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
