/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { FundDataInterface, FundInterface, FundsInterface } from './state';

const actions: ActionTree<FundsInterface, StateInterface> = {
  GetFundsData(
    { state, getters, dispatch },
    payload: { time: string; resolution: string }
  ) {
    for (let i = 0; i < state.funds.length; i++) {
      let funds;
      if (payload.resolution == 'day') {
        funds = <FundDataInterface[]>getters['GetFundByDayAndId']({
          time: payload.time,
          id: state.funds[i].id,
        });
      } else if (payload.resolution == 'hour') {
        funds = <FundDataInterface[]>getters['GetFundByHourAndId']({
          time: payload.time,
          id: state.funds[i].id,
        });
      }
      if (!funds) {
        const fund = <FundInterface>(
          getters['GetFundsInfoById'](state.funds[i].id)
        );
        const data = <FundDataInterface>{
          label: fund.label,
          id: state.funds[i].id,
          created: fund.created,
          red: fund.red,
          platform: fund.platform,
          time: payload.time,
          tvl: 0,
          volume: 0,
          feesUSD: 0,
          apy: 0,
          stabilus_fees: '',
          fund_weight: 0,
        };
        if (state.funds[i].platform.toLowerCase() == 'uniswap') {
          if (payload.resolution == 'hour') {
            void dispatch('PoolsModule/FETCH_UNISWAP_HOUR_DATA', data, {
              root: true,
            });
          } else if (payload.resolution == 'day') {
            void dispatch('PoolsModule/FETCH_UNISWAP_DAY_DATA', data, {
              root: true,
            });
          }
        } else if (state.funds[i].platform.toLowerCase() == 'anchor') {
          if (payload.resolution == 'hour') {
            void dispatch('TerraModule/FETCH_ANCHOR_HOUR_DATA', data, {
              root: true,
            });
          } else if (payload.resolution == 'day') {
            void dispatch('TerraModule/FETCH_ANCHOR_DAY_DATA', data, {
              root: true,
            });
          }
        }
      }
    }
  },
  async GetFundsDataByDay(
    { dispatch, state, getters, commit },
    DayNum: { time: string }
  ) {
    void (await dispatch('GetFundsData', {
      time: DayNum.time,
      resolution: 'day',
    }).then(() => {
      setTimeout(function () {
        if (state.dayData.length >= 1) {
          const data = <FundDataInterface[]>getters['GetFundsByDay']({
            time: DayNum.time,
          });
          void dispatch('GetFundsPooolsWeight', data).then((response) => {
            response.forEach((element: FundDataInterface) => {
              if (element.fund_weight && element.fund_weight > 0) {
                commit('UpdateFundDayDataFundWeight', element);
              }
            });
          });
        }
      }, 3000);
    }));
  },
  async GetFundsDataByHour(
    { dispatch, state, getters, commit },
    HourNum: { time: string }
  ) {
    void (await dispatch('GetFundsData', {
      time: HourNum.time,
      resolution: 'hour',
    }).then(() => {
      setTimeout(function () {
        if (state.hourData.length >= 3) {
          const data = <FundDataInterface[]>getters['GetFundsByHour']({
            time: HourNum.time,
          });
          void dispatch('GetFundsPooolsWeight', data).then((response) => {
            response.forEach((element: FundDataInterface) => {
              if (element.fund_weight && element.fund_weight > 0) {
                commit('UpdateFundHourDataFundWeight', element);
              }
            });
          });
        }
      }, 1500);
    }));
  },
  async GetFundsPooolsWeight({}, data: FundDataInterface) {
    const endpoint = 'https://optimizer-tl33mijhla-as.a.run.app';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const weights = await fetch(`${endpoint}/day/5`, requestOptions).then(
      (res) => res.json() as unknown as FundDataInterface[]
    );

    return new Promise<FundDataInterface[]>((resolve) => {
      resolve(weights);
    }).catch((e) => {
      console.log(e);
    });
  },
  GetFundsHistoricalDatabyDay() {
    console.log('GetFundsHistoricalDatabyDay');
  },
};

export default actions;
