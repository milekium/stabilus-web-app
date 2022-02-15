import { BigSource } from 'big.js';

export interface MarketCollateralsHistory {
  timestamp: string;
  total_value: string;
  collaterals: Array<{ symbol: string; collateral: BigSource; price: number }>;
}

export interface MarketCollateralsData {
  now: MarketCollateralsHistory;
  history: MarketCollateralsHistory[];
}

export type MarketCollateralsQueryParams = {
  endpoint: string;
};

export interface MarketDepositHistoryRaw {
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

export interface MarketDepositRaw {
  total_ust_deposits: BigSource;
  total_depositors: {
    last_updated: number;
    holders: number;
  };
}

export interface EarnAPYData {
  timestamp: string;
  height: number;
  deposit_rate: number;
}
export type EarnAPYHistoryData = Array<EarnAPYData>;

export interface TerraInterface {
  prop: boolean;
}

function state(): TerraInterface {
  return {
    prop: false,
  };
}

export default state;
