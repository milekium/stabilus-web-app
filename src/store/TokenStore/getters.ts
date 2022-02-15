import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { TokenInterface } from './state';

const getters: GetterTree<TokenInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
