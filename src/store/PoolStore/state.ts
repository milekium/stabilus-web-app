import { TokenInterface } from './../TokenStore/state';
import { BigSource } from 'big.js';

export interface PoolDayData {
  id: string;
  date: string;
  pool: PoolInterface;
  liquidity: BigSource;
  sqrtPrice: BigSource;
  token0Price: BigSource;
  token1Price: BigSource;
  tick: BigInt;
  feeGrowthGlobal0X128: BigSource;
  feeGrowthGlobal1X128: BigSource;
  tvlUSD: BigSource;
  volumeToken0: BigSource;
  volumeToken1: BigSource;
  volumeUSD: BigSource;
  feesUSD: BigSource;
  txCount: BigSource;
  open: BigSource;
  high: BigSource;
  low: BigSource;
  close: BigSource;
}
export interface PoolHourData {
  id: string;
  periodStartUnix: string;
  pool: PoolInterface;
  liquidity: BigSource;
  sqrtPrice: BigSource;
  token0Price: BigSource;
  token1Price: BigSource;
  tick: BigInt;
  feeGrowthGlobal0X128: BigSource;
  feeGrowthGlobal1X128: BigSource;
  tvlUSD: BigSource;
  volumeToken0: BigSource;
  volumeToken1: BigSource;
  volumeUSD: BigSource;
  feesUSD: BigSource;
  txCount: BigSource;
  open: BigSource;
  high: BigSource;
  low: BigSource;
  close: BigSource;
}
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
  totalValueLockedUSD: BigSource;
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

export type DataQueryParams = {
  endpoint: string;
  id: string;
  day_date: string;
  hour_date: string;
  graph_client: string;
};

export type UniswapDayDataQueryParams = {
  hour_date: string;
  ids: Array<string>;
  red: string;
};

export type UniswapDataQueryParams = {
  endpoint: string;
  id: string;
  day_date: string;
  hour_date: string;
  graph_client: string;
};
export default state;
