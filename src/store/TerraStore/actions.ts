/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ActionTree } from 'vuex';
import big from 'big.js';
import { StateInterface } from '../index';
import {
  TerraInterface,
  MarketCollateralsHistory,
  MarketDepositRaw,
  EarnAPYHistoryData,
} from './state';
import { FundDataInterface, FundInterface } from '../FundsStore/state';
const actions: ActionTree<TerraInterface, StateInterface> = {
  FETCH_ANCHOR_DAY_DATA({ dispatch, commit }, payload: FundDataInterface) {
    void dispatch('FETCH_ANCHOR_DATA', payload).then(
      (data: FundDataInterface) => {
        commit('FundsModule/setFundDayData', data, { root: true });
      }
    );
  },
  FETCH_ANCHOR_HOUR_DATA({ dispatch, commit }, payload: FundDataInterface) {
    void dispatch('FETCH_ANCHOR_DATA', payload).then(
      (data: FundDataInterface) => {
        data.feesUSD = big(data.feesUSD).div(24).toFixed(18);
        data.apy = data.apy / 24;
        data.stabilus_fees = big(data.stabilus_fees).div(24).toFixed(3);
        commit('FundsModule/setFundHourData', data, {
          root: true,
        });
      }
    );
  },
  async FETCH_ANCHOR_DATA({ rootGetters }, payload: FundDataInterface) {
    const endpoint = 'https://api.anchorprotocol.com/api';

    const deposit: MarketDepositRaw = await fetch(
      `${endpoint}/v1/deposit`
    ).then((res) => res.json() as unknown as MarketDepositRaw);

    const collateral: MarketCollateralsHistory = await fetch(
      `${endpoint}/v1/collaterals`
    ).then((res) => res.json() as unknown as MarketCollateralsHistory);

    const earnAPY: EarnAPYHistoryData = await fetch(
      `${endpoint}/v2/deposit-rate`
    ).then((res) => res.json() as unknown as EarnAPYHistoryData);
    const pool = <FundInterface>(
      rootGetters['FundsModule/GetFundsInfoById'](payload.id)
    );
    const apy = Number(big(earnAPY[1].deposit_rate).times(4656810).div(365));
    const data = <FundDataInterface>{
      label: pool.label,
      feesUSD: big(deposit.total_ust_deposits)
        .plus(collateral.total_value)
        .times((earnAPY[1].deposit_rate * 4656810) / 365)
        .toFixed(18),
      stabilus_fees: parseFloat((apy * 100000).toFixed(3)),
      red: pool.red,
      platform: pool.platform,
      id: pool.id,
      tvl: big(deposit.total_ust_deposits)
        .plus(collateral.total_value)
        .toFixed(18),
      volume: deposit.total_ust_deposits,
      apy: apy,
      time: payload.time,
      created: pool.created,
      fund_weight: 0,
    };
    return new Promise<FundDataInterface>((resolve) => {
      resolve(data);
    });
  },
};

export default actions;
