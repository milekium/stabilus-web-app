import { MutationTree } from 'vuex';
import { FundsInterface, FundDataInterface } from './state';

const mutation: MutationTree<FundsInterface> = {
  setFundDayData(state: FundsInterface, data: FundDataInterface) {
    const DataDay = state.dayData.filter(
      (obj: { time: string; id: string }) =>
        obj.time == data.time && obj.id == data.id
    )[0];
    if (!DataDay) {
      state.dayData.push(data);
    }
  },
  setFundHourData(state: FundsInterface, data: FundDataInterface) {
    const DataHour = state.hourData.filter(
      (obj: { time: string; id: string }) =>
        obj.time == data.time && obj.id == data.id
    )[0];
    if (!DataHour) {
      state.hourData.push(data);
    }
  },
  UpdateFundHourDataFundWeight(state: FundsInterface, data: FundDataInterface) {
    const DataHour = state.hourData.filter(
      (obj: { time: string; id: string }) =>
        obj.time == data.time && obj.id == data.id
    )[0];
    if (DataHour) {
      DataHour.fund_weight = data.fund_weight;
    }
  },
  UpdateFundDayDataFundWeight(state: FundsInterface, data: FundDataInterface) {
    const DataDay = state.dayData.filter(
      (obj: { time: string; id: string }) =>
        obj.time == data.time && obj.id == data.id
    )[0];
    if (DataDay) {
      DataDay.fund_weight = data.fund_weight;
    }
  },
};

export default mutation;
