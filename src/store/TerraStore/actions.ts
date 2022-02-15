import { ActionTree } from 'vuex';
import big from 'big.js';
import { StateInterface } from '../index';
import {
  TerraInterface,
  MarketCollateralsHistory,
  MarketDepositRaw,
  EarnAPYHistoryData,
} from './state';
import { TokenInterface } from '../TokenStore/state';
import { PoolInterface, PoolsInterface } from './../PoolStore/state';
const actions: ActionTree<TerraInterface, StateInterface> = {
  FETCH_DATA({ dispatch, commit }) {
    void dispatch('FETCH_ANCHOR_DATA').then((value: PoolsInterface) => {
      commit(
        'PoolsModule/setPoolsData',
        { val: [value], net: 'Terra' },
        { root: true }
      );
      console.log(value);
    });
  },
  async FETCH_ANCHOR_DATA({}) {
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
    console.log(
      deposit.total_ust_deposits,
      collateral.total_value,
      earnAPY[1].deposit_rate * 1000000
    );
    const token0: TokenInterface = {
      id: '',
      symbol: 'UST',
      name: '',
      decimals: '',
      totalSupply: '',
      volume: '',
      volumeUSD: '',
      untrackedVolumeUSD: '',
      feesUSD: '',
      txCount: '',
      poolCount: '',
      totalValueLocked: '',
      totalValueLockedUSD: '',
      totalValueLockedUSDUntracked: '',
      derivedETH: '',
    };
    const token1 = <TokenInterface>JSON.parse(JSON.stringify(token0));
    token1.symbol = '';
    const data: PoolInterface = {
      id: '',
      createdAtTimestamp: '',
      createdAtBlockNumber: '',
      network: 'terra',
      token0: token0,
      token1: token1,
      feeTier: '',
      liquidity: '',
      sqrtPrice: '',
      feeGrowthGlobal0X128: '',
      feeGrowthGlobal1X128: '',
      token0Price: '',
      token1Price: '',
      tick: '',
      observationIndex: '',
      volumeUSD: big(deposit.total_ust_deposits).div(1000000000),
      untrackedVolumeUSD: '',
      feesUSD: big(deposit.total_ust_deposits)
        .times(earnAPY[1].deposit_rate * 10000)
        .div(100000000)
        .toFixed(18),
      txCount: '',
      collectedFeesToken0: '',
      collectedFeesToken1: '',
      collectedFeesUSD: '',
      totalValueLockedToken0: '',
      totalValueLockedToken1: '',
      totalValueLockedETH: '',
      totalValueLockedUSD: Number(
        big(
          big(deposit.total_ust_deposits)
            .plus(collateral?.total_value ? collateral.total_value : 0)
            .div(1000000000)
        ).toFixed(18)
      ),
      totalValueLockedUSDUntracked: '',
      liquidityProviderCount: '',
      volumeToken0: '',
      volumeToken1: '',
    };
    return new Promise<PoolInterface>((resolve) => {
      resolve(data);
    });
  },
};

export default actions;
