import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { TokenInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const TokenModule: Module<TokenInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default TokenModule;
