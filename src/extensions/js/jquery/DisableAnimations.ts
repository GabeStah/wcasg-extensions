import { Extension } from 'types/extension';
import HasJquery from 'predicates/HasJquery';

export const DisableAnimations = new Extension({
  action: () => {
    if (window['jQuery'] && window['jQuery'].fx) {
      window['jQuery'].fx.off = true;
    }
  },
  description: 'Disables all jQuery animations.',
  name: 'DisableAnimations',
  predicate: HasJquery
});

export default DisableAnimations;
