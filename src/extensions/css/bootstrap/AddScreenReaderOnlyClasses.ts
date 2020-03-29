import { Extension } from 'types/extension';
import AddSrClasses from 'actions/AddSrClasses';
import HasBootstrap from 'predicates/HasBootstrap';

export const AddScreenReaderOnlyClasses = new Extension({
  action: AddSrClasses,
  description:
    "Adds 'sr-only' and 'sr-only-focusable' attributes to all buttons, labels, and primary text elements.",
  enabled: false,
  name: 'Add Screen Reader Only Classes',
  predicate: [HasBootstrap]
});

export default AddScreenReaderOnlyClasses;
