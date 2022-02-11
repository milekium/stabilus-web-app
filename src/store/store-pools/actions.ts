/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActionTree } from 'vuex';
import { watch } from 'vue';
import { StateInterface } from '../index';
import big, { BigSource } from 'big.js';

import {
  PoolsStateInterface,
  PoolStateInterface,
  PoolDataInterface,
} from './state';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

interface MarketDepositHistoryRaw {
  total_ust_deposits: Array<{
    deposit: BigSource;
    liability: '74481041162848.589699372014181516';
    timestamp: string;
  }>;
  total_depositors: Array<{
    last_updated: string;
    holders: 14232;
    height: 3125366;
    timestamp: string;
  }>;
}
export interface EarnAPYData {
  timestamp: string;
  Height: number;
  DepositRate: number;
}
export type EarnAPYHistoryData = Array<EarnAPYData>;

export interface MarketCollateralsHistoryData {
  timestamp: string;
  total_value: BigSource;
  collaterals: Array<{ symbol: string; collateral: bigint; price: number }>;
}
export type MarketCollateralsHistory = Array<MarketCollateralsHistoryData>;

export interface MarketCollateralsData {
  now: MarketCollateralsHistory;
  history: Array<MarketCollateralsHistory>;
}

export type MarketCollateralsQueryParams = {
  endpoint: string;
};

const actions: ActionTree<PoolsStateInterface, StateInterface> = {
  FETCH_POOL_DATA({ dispatch, getters }, payload: PoolStateInterface) {
    if (payload && payload.platform == 'Uniswap') {
      const today = Math.round(Date.now() / 86400000).toFixed(0);
      const pool: PoolStateInterface = getters['getPoolById'](payload.id);
      const created = Math.round(parseInt(pool.created) / 86400).toFixed(0);
      for (let cc = parseInt(today); cc > parseInt(created); cc--) {
        if (
          !pool.data.find((dt: { date: string }) => dt.date == cc.toString())
        ) {
          const params = {
            id: payload.id,
            date: cc.toString(),
            client: 'clientUniswapPol',
          };
          if (payload.red == 'Ethereum') {
            params.client = 'clientUniswapEth';
          }
          void dispatch('FETCH_UNISWAP_DATA', params);
        }
      }
    } else if (payload && payload.platform == 'Anchor') {
      const params = {
        endpoint: 'https://api.anchorprotocol.com/api',
        id: payload.id,
      };
      void dispatch('FETCH_ANCHOR_DATA', params).then((data) => {
        console.log('received', data);
      });
    }
  },
  FETCH_UNISWAP_DATA(
    {
      commit,
      /*, state*/
    },
    payload
  ) {
    return new Promise<void>((resolve) => {
      const qid = payload.id.concat('-'.concat(<string>payload.date));
      const { result } = useQuery(
        gql`
          query getPosts($qid: ID!) {
            poolDayDatas(where: { id: $qid }) {
              date
              tvlUSD
              volumeToken0
              feesUSD
            }
          }
        `,
        { qid },
        { clientId: payload.client }
      );
      watch(result, (value) => {
        if (value.poolDayDatas.length !== 0) {
          const data = <PoolDataInterface>{
            id: payload.id,
            tvl: value.poolDayDatas[0].tvlUSD,
            volumen: value.poolDayDatas[0].volumeToken0,
            apy:
              value.poolDayDatas[0].feesUSD /
              value.poolDayDatas[0].volumeToken0,
            date: value.poolDayDatas[0].date,
          };
          void commit('setPoolData', data);
        }
        resolve();
      });
    });
  },
  async FETCH_ANCHOR_DATA(
    {
      commit,
      /*, state*/
    },
    params: { endpoint: string; id: string }
  ) {
    const depositHistory: MarketDepositHistoryRaw = await fetch(
      `${params.endpoint}/v1/deposit/1d`
    ).then((res) => res.json());

    const collateralHistory: MarketCollateralsHistory = await fetch(
      `${params.endpoint}/v1/collaterals/1d`
    ).then((res) => res.json());

    const earnAPYHistory: EarnAPYHistoryData = await fetch(
      `${params.endpoint}/v2/deposit-rate`
    ).then((res) => res.json());

    console.log(earnAPYHistory);

    const data = [
      ...depositHistory.total_ust_deposits
        .map(({ deposit, timestamp }) => {
          const collateral = collateralHistory.find(
            (coll) => coll.timestamp == timestamp.toString()
          );
          const apy = earnAPYHistory.find(
            (earn) => earn.timestamp == '1644310800'
          );
          // console.log((parseInt(timestamp) / 1000).);
          const tvlValue = big(deposit)
            .plus(collateral?.total_value ? collateral.total_value : 0)
            .toFixed();

          const pooldata = <PoolDataInterface>(<unknown>{
            id: params.id,
            tvl: tvlValue.valueOf(),
            volumen: deposit.valueOf(),
            apy: apy?.DepositRate ? apy.DepositRate : 0,
            date: parseInt(timestamp) / 1000,
          });
          void commit('setPoolData', pooldata);

          return pooldata;
        })
        .reverse(),
    ];
    return data;
  },
};

export default actions;
