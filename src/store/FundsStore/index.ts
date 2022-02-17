import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { FundsInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const FundsModule: Module<FundsInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default FundsModule;
