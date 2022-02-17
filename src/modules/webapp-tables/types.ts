import { BigSource } from 'big.js';
import { Rate } from 'src/modules/utils/types';

export interface rows {
  name: string;
  tvl: BigSource;
  volume: BigSource;
  apy: Rate;
  feesusd: BigSource;
  stabilus_fees: BigSource;
  network: string;
}
