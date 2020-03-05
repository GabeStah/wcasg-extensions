import { Action } from 'types/action';

export const Export = new Action({
  fn: () => {
    if (window['jQuery'] && window['jQuery'].fx) {
      window['jQuery'].fx.off = true;
    }
  },
  name: 'DisableJqueryFx'
});

export default Export;
