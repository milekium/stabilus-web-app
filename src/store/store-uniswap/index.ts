import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { StoreUniswapInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const storeUniswap: Module<StoreUniswapInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default storeUniswap;
