import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { TerraInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const TerraModule: Module<TerraInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default TerraModule;