import { Extension } from 'types/extension';
import AddAriaLabels from 'actions/AddAriaLabels';
import HasWordpress from 'predicates/HasWordpress';

export const AddMissingAriaLabels = new Extension({
  action: AddAriaLabels,
  description:
    "Adds missing 'aria-label' attributes with most relevant text value to all buttons, labels, and primary text elements.",
  name: 'AddMissingAriaLabels',
  predicate: [HasWordpress]
});

export default AddMissingAriaLabels;
