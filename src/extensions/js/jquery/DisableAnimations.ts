import { Extension } from 'types/extension';
import DisableJqueryFx from 'actions/DisableJqueryFx';
import HasJquery from 'predicates/HasJquery';

export const DisableAnimations = new Extension({
  action: DisableJqueryFx,
  description: 'Disables all jQuery animations.',
  name: 'DisableAnimations',
  predicate: HasJquery
});

export default DisableAnimations;
