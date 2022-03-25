import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { FundsInterface, FundDataInterface, FundInterface } from './state';

const getters: GetterTree<FundsInterface, StateInterface> = {
  GetFundsInfo(state) {
    return state.funds;
  },
  GetFundsInfoById: (state: { funds: FundInterface[] }) => (qid: string) => {
    return state.funds.find((val) => val.id == qid);
  },
  GetFundByDayAndId:
    (state: { dayData: FundDataInterface[] }) => (date: string, id: string) => {
      return state.dayData.filter(
        (obj: { time: string; id: string }) => obj.time == date && obj.id == id
      )[0];
    },
  GetFundByHourAndId:
    (state: { hourData: FundDataInterface[] }) =>
    (date: string, id: string) => {
      return state.hourData.filter(
        (obj: { time: string; id: string }) => obj.time == date && obj.id == id
      )[0];
    },
  GetFundsByDay:
    (state: { dayData: FundDataInterface[] }) =>
    (payload: { time: string }) => {
      return state.dayData.filter((val) => val.time == payload.time);
    },
  GetFundsByHour:
    (state: { hourData: FundDataInterface[] }) =>
    (payload: { time: string }) => {
      return state.hourData.filter((val) => val.time == payload.time);
    },
};

export default getters;
