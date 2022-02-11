import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PoolsStateInterface } from './state';

const getters: GetterTree<PoolsStateInterface, StateInterface> = {
  getPoolById: (state) => (id: string) => {
    return state.pools.find((pool) => pool.id === id);
  },
  // getPoolDataByDate: () => (id: string, date: number) => {
  // },
};

export default getters;
