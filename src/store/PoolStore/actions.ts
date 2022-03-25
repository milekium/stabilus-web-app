/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FundInterface } from './../FundsStore/state';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PoolDayData, PoolsInterface } from './state';
import gql from 'graphql-tag';
import { FundDataInterface } from '../FundsStore/state';
import { apolloClients } from 'src/boot/apollo';
import type { DocumentNode } from 'graphql';
import big from 'big.js';

const actions: ActionTree<PoolsInterface, StateInterface> = {
  ACTION_TEST({ commit }, data) {
    commit('setFeesUSD', data);
  },
  FETCH_UNISWAP_DAY_DATA({ commit, dispatch }, payload: FundDataInterface) {
    return new Promise<FundDataInterface | unknown>(() => {
      const query = gql`
        query getPosts($qid: ID!) {
          poolDayData(id: $qid) {
            tvlUSD
            volumeUSD
            feesUSD
          }
        }
      `;
      void dispatch('FETCH_UNISWAP_DATA', { payload, query }).then(
        (data: FundDataInterface) => {
          commit('FundsModule/setFundDayData', data, { root: true });
        }
      );
    });
  },
  FETCH_UNISWAP_HOUR_DATA({ dispatch, commit }, payload: FundDataInterface) {
    const query = gql`
      query getPosts($qid: ID!) {
        poolHourData(id: $qid) {
          tvlUSD
          volumeUSD
          feesUSD
        }
      }
    `;
    void dispatch('FETCH_UNISWAP_DATA', { payload, query }).then(
      (data: FundDataInterface) => {
        commit('FundsModule/setFundHourData', data, { root: true });
      }
    );
  },
  FETCH_UNISWAP_DATA(
    { rootGetters },
    data: { payload: FundDataInterface; query: DocumentNode }
  ) {
    return new Promise<FundDataInterface | unknown>((resolve) => {
      const payload = data.payload;
      const qid = payload.id.concat('-'.concat(payload.time));
      let client;
      if (payload.red.toLowerCase() == 'ethereum') {
        client = apolloClients.clientUniswapEth;
      } else {
        client = apolloClients.clientUniswapPol;
      }
      void client
        .query({
          query: data.query,
          variables: { qid },
        })
        .then((result) => {
          const value: PoolDayData = result.data.poolDayData
            ? result.data.poolDayData
            : result.data.poolHourData;
          const pool = <FundInterface>(
            rootGetters['FundsModule/GetFundsInfoById'](payload.id)
          );
          let data: FundDataInterface;
          if (value) {
            data = <FundDataInterface>{
              label: pool.label,
              feesUSD: big(value.feesUSD).toFixed(3),
              stabilus_fees: big(value.feesUSD)
                .div(value.tvlUSD)
                .times(100000)
                .toFixed(3),
              red: pool.red,
              platform: pool.platform,
              id: pool.id,
              tvl: big(value.tvlUSD).toFixed(18),
              volume: value.volumeUSD,
              apy: 0,
              time: payload.time,
              created: pool.created,
              fund_weight: 0,
            };
          } else {
            data = <FundDataInterface>{
              label: pool.label,
              feesUSD: 0,
              stabilus_fees: 0,
              red: pool.red,
              platform: pool.platform,
              id: pool.id,
              tvl: 0,
              volume: 0,
              apy: 0,
              time: payload.time,
              created: pool.created,
              fund_weight: 0,
            };
          }
          resolve(data);
        })
        .catch((e) => {
          console.log('error: ', e);
        });
    });
  },
};

export default actions;
