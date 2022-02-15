import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TokenInterface } from './state';

const actions: ActionTree<TokenInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
