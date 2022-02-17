/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NominalType, Token, u } from 'src/modules/utils/types';
import big, { Big, BigSource } from 'big.js';

// ---------------------------------------------
// micro
// ---------------------------------------------
export const MICRO = 1000000;

export function microfy<T extends Token<BigSource>>(
  amount: T
): T extends NominalType<infer N> ? u<Big & NominalType<N>> : u<T> {
  return big(amount).mul(MICRO) as any;
}

export function demicrofy<T extends Token<BigSource>>(
  amount: u<T>,
  decimals = 6
): T extends NominalType<infer N> ? Big & NominalType<N> : T {
  return big(amount).div(Math.pow(10, decimals)) as any;
}
