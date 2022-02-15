import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PoolsInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const PoolsModule: Module<PoolsInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default PoolsModule;
