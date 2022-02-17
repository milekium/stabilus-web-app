/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */
import { HumanAddr } from 'src/modules/utils/types';

export namespace lp {
  export interface Minter {
    minter: {};
  }

  export interface MinterResponse {
    /** terraswap pair address */
    minter: HumanAddr;
  }
}
