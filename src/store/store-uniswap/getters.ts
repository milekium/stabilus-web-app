import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { StoreUniswapInterface } from './state';

const getters: GetterTree<StoreUniswapInterface, StateInterface> = {
  getPoolById: (state) => (label: string) => {
    return state.cols.find((col) => col.label === label);
  },
};

export default getters;
