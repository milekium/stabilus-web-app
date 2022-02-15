/* eslint-disable  */
import { watch } from 'vue';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PoolsInterface, PoolInterface } from './state';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const actions: ActionTree<PoolsInterface, StateInterface> = {
  ACTION_TEST({ commit }, data) {
    commit('setFeesUSD', data);
  },
  FETCH_POOLS_DATA({ dispatch, commit }) {
    void dispatch('FETCH_UNISWAP_DATA', { client: 'clientUniswapEth' })
      .then((val) => {
        commit('setPoolsData', { val: val, net: 'Ethereum' });
      })
      .catch((e) => {
        console.log(e);
      });
    void dispatch('FETCH_UNISWAP_DATA', { client: 'clientUniswapPol' })
      .then((val) => {
        commit('setPoolsData', { val: val, net: 'Poligon' });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  FETCH_UNISWAP_DATA({}, playload) {
    return new Promise<void>((resolve) => {
      const { result, error } = useQuery(
        gql`
          query getPools {
            pools(
              first: 15
              orderDirection: desc
              orderBy: totalValueLockedUSD
            ) {
              id
              createdAtTimestamp
              createdAtBlockNumber
              volumeUSD
              feesUSD
              totalValueLockedUSD
              liquidity
              token0 {
                id
                symbol
              }
              token1 {
                id
                symbol
              }
            }
          }
        `,
        null,
        { clientId: playload.client }
      );
      watch(result, (val) => {
        resolve(val.pools);
      });
      watch(error, (val) => {
        console.log(val);
        resolve();
      });
    });
  },
};

export default actions;
