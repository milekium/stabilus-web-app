import { BigSource } from 'big.js';

export interface TokenInterface {
  id: string;
  symbol: string;
  name: string;
  decimals: BigSource;
  totalSupply: BigSource;
  volume: BigSource;
  volumeUSD: BigSource;
  untrackedVolumeUSD: BigSource;
  feesUSD: BigSource;
  txCount: BigSource;
  poolCount: BigSource;
  totalValueLocked: BigSource;
  totalValueLockedUSD: BigSource;
  totalValueLockedUSDUntracked: BigSource;
  derivedETH: BigSource;
}

function state(): TokenInterface {
  return {
    id: '',
    symbol: '',
    name: '',
    decimals: 0,
    totalSupply: 0,
    volume: 0,
    volumeUSD: 0,
    untrackedVolumeUSD: 0,
    feesUSD: 0,
    txCount: 0,
    poolCount: 0,
    totalValueLocked: 0,
    totalValueLockedUSD: 0,
    totalValueLockedUSDUntracked: 0,
    derivedETH: 0,
  };
}

export default state;
