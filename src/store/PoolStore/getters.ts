import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PoolsInterface } from './state';

const getters: GetterTree<PoolsInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
