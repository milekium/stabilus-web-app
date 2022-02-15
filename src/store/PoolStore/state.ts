import { TokenInterface } from './../TokenStore/state';
import { BigSource } from 'big.js';

export interface PoolInterface {
  id: string;
  network: string;
  createdAtTimestamp: string;
  createdAtBlockNumber: string;
  token0: TokenInterface;
  token1: TokenInterface;
  feeTier: BigSource;
  liquidity: BigSource;
  sqrtPrice: BigSource;
  feeGrowthGlobal0X128: BigSource;
  feeGrowthGlobal1X128: BigSource;
  token0Price: BigSource;
  token1Price: BigSource;
  tick: BigSource;
  observationIndex: BigSource;
  volumeToken0: BigSource;
  volumeToken1: BigSource;
  volumeUSD: BigSource;
  untrackedVolumeUSD: BigSource;
  feesUSD: BigSource;
  txCount: BigSource;
  collectedFeesToken0: BigSource;
  collectedFeesToken1: BigSource;
  collectedFeesUSD: BigSource;
  totalValueLockedToken0: BigSource;
  totalValueLockedToken1: BigSource;
  totalValueLockedETH: BigSource;
  totalValueLockedUSD: number;
  totalValueLockedUSDUntracked: BigSource;
  liquidityProviderCount: BigSource;
  // poolHourData: ![!PoolHourData];
  // poolDayData: ![!PoolDayData];
}

export interface PoolsInterface {
  pools: Array<PoolInterface>;
}

function state(): PoolsInterface {
  return {
    pools: [],
  };
}

export default state;
