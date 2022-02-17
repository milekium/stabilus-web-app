import { BigSource } from 'big.js';
import { Rate } from 'src/modules/utils/types';

export interface FundInterface {
  name: string;
  tvl: BigSource;
  volume: BigSource;
  apy: Rate;
  feesusd: BigSource;
  stabilus_fees: BigSource;
  network: string;
}
export interface FundsInfoInterface {
  label: string;
  red: string;
  platform: string;
  id: string;
  created: string;
}
const FundsInfo: FundsInfoInterface[] = [
  {
    label: 'UST',
    red: 'Terra',
    platform: 'Anchor',
    id: '2',
    created: '',
  },
  {
    label: 'DAI/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x5777d92f208679db4b9778590fa3cab3ac9e2168',
    created: '1636771503',
  },
  {
    label: 'FRAX/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
    created: '1620287538',
  },
  {
    label: 'USDC/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x3416cf6c708da44db2624d63ea0aaef7113527c6',
    created: '1636825557',
  },
  {
    label: 'DAI/FRAX',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x97e7d56a0408570ba1a7852de36350f7713906ec',
    created: '1622219225',
  },
  {
    label: 'DAI/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x6c6bc977e13df9b0de53b251522280bb72383700',
    created: '1620158293',
  },
  {
    label: 'BUSD/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x00cef0386ed94d738c8f8a74e8bfd0376926d24c',
    created: '1621884053',
  },
  {
    label: 'FEI/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xdf50fbde8180c8785842c8e316ebe06f542d3443',
    created: '1638823451',
  },
  {
    label: 'USDC/UST',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x92995d179a5528334356cb4dc5c6cbb1c068696c',
    created: '1620247806',
  },
  {
    label: 'DAI/FEI',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xbb2e5c2ff298fd96e166f90c8abacaf714df14f8',
    created: '1620169433',
  },
  {
    label: 'DAI/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77',
    created: '1620162016',
  },
  {
    label: 'FRAX/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xc2a856c3aff2110c1171b8f942256d40e980c726',
    created: '1628752930',
  },
  {
    label: 'FEI/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x8c54aa2a32a779e6f6fbea568ad85a19e0109c26',
    created: '1621839430',
  },
  {
    label: 'UST/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x868b7bbbfe148516e5397f23982923686182c2d2',
    created: '1620271655',
  },
  {
    label: 'BUSD/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x5e35c4eba72470ee1177dcb14dddf4d9e6d915f4',
    created: '1639537868',
  },
  {
    label: 'MIM/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x298b7c5e0770d151e4c5cf6cca4dae3a3ffc8e27',
    created: '1623744882',
  },
  {
    label: 'DOLA/USDC',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x7c082bf85e01f9bb343dbb460a14e51f67c58cfb',
    created: '1634484049',
  },
  {
    label: 'MIM/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xe6e14be906c1f1b438da2010b38beca14b387231',
    created: '1635126185',
  },
  {
    label: 'DAI/UST',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0x973a67726227ce2747d5710eb44a53fb9abfd02a',
    created: '1621083505',
  },
  {
    label: 'BUSD/USDT',
    red: 'Ethereum',
    platform: 'Uniswap',
    id: '0xd5ad5ec825cac700d7deafe3102dc2b6da6d195d',
    created: '1620293859',
  },
  {
    label: 'USDC/USDT',
    red: 'Polygon',
    platform: 'Uniswap',
    id: '0x3f5228d0e7d75467366be7de2c31d0d098ba2c23',
    created: '1640136472',
  },
  {
    label: 'USDC/DAI',
    red: 'Polygon',
    platform: 'Uniswap',
    id: '0x5f69c2ec01c22843f8273838d570243fd1963014',
    created: '1640109544',
  },
  {
    label: 'USDC/UST',
    red: 'Polygon',
    platform: 'Uniswap',
    id: '0x90e883972ebcbebc871f3f0658bab1821b8e8705',
    created: '1642479987',
  },
  {
    label: 'USDC/FRAX',
    red: 'Polygon',
    platform: 'Uniswap',
    id: '0xbeaf7156ba07c3df8fac42e90188c5a752470db7',
    created: '1640217382',
  },
  {
    label: 'DAI/USDT',
    red: 'Polygon',
    platform: 'Uniswap',
    id: '0x42f0530351471dab7ec968476d19bd36af9ec52d',
    created: '1640112722',
  },
];

export interface FundsInterface {
  funds: FundsInfoInterface[];
}

function state(): FundsInterface {
  return {
    funds: FundsInfo,
  };
}

export default state;
