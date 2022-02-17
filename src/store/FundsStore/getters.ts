import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { FundsInterface } from './state';

const getters: GetterTree<FundsInterface, StateInterface> = {
  GetFundsByDay(state) {
    console.log('funds by day ss', state);

    return state.funds;
  },
};

export default getters;
