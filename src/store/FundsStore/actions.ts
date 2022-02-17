import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { FundsInterface } from './state';

const actions: ActionTree<FundsInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
