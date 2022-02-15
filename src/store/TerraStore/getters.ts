import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { TerraInterface } from './state';

const getters: GetterTree<TerraInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
