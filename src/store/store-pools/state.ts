// import { BigSource } from 'big.js';

export interface PoolDataInterface {
  apy: number;
  tvl: bigint;
  volumen: bigint;
  date: string;
  id: string;
}
export interface PoolDataColumnsInterface {
  name: string;
  required: boolean;
  label: string;
  align: string;
  field: string;
  format: (arg0: never) => void;
  sortable: boolean;
}

export interface PoolStateInterface {
  label: string;
  red: string;
  platform: string;
  id: string;
  created: string;
  data: Array<PoolDataInterface>;
}
export interface PoolsStateInterface {
  pools: Array<PoolStateInterface>;
  dataCols: Array<PoolDataColumnsInterface>;
}
import { date } from 'quasar';
function state(): PoolsStateInterface {
  return {
    pools: [
      {
        label: 'UST',
        red: 'Terra',
        platform: 'Anchor',
        id: '2',
        created: '',
        data: [],
      },
      {
        label: 'DAI/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x5777d92f208679db4b9778590fa3cab3ac9e2168',
        created: '1636771503',
        data: [],
      },
      {
        label: 'FRAX/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
        created: '1620287538',
        data: [],
      },
      {
        label: 'USDC/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x3416cf6c708da44db2624d63ea0aaef7113527c6',
        created: '1636825557',
        data: [],
      },
      {
        label: 'DAI/FRAX',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x97e7d56a0408570ba1a7852de36350f7713906ec',
        created: '1622219225',
        data: [],
      },
      {
        label: 'DAI/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x6c6bc977e13df9b0de53b251522280bb72383700',
        created: '1620158293',
        data: [],
      },
      {
        label: 'BUSD/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x00cef0386ed94d738c8f8a74e8bfd0376926d24c',
        created: '1621884053',
        data: [],
      },
      {
        label: 'FEI/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xdf50fbde8180c8785842c8e316ebe06f542d3443',
        created: '1638823451',
        data: [],
      },
      {
        label: 'USDC/UST',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x92995d179a5528334356cb4dc5c6cbb1c068696c',
        created: '1620247806',
        data: [],
      },
      {
        label: 'DAI/FEI',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xbb2e5c2ff298fd96e166f90c8abacaf714df14f8',
        created: '1620169433',
        data: [],
      },
      {
        label: 'DAI/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77',
        created: '1620162016',
        data: [],
      },
      {
        label: 'FRAX/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xc2a856c3aff2110c1171b8f942256d40e980c726',
        created: '1628752930',
        data: [],
      },
      {
        label: 'FEI/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x8c54aa2a32a779e6f6fbea568ad85a19e0109c26',
        created: '1621839430',
        data: [],
      },
      {
        label: 'UST/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x868b7bbbfe148516e5397f23982923686182c2d2',
        created: '1620271655',
        data: [],
      },
      {
        label: 'BUSD/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x5e35c4eba72470ee1177dcb14dddf4d9e6d915f4',
        created: '1639537868',
        data: [],
      },
      {
        label: 'MIM/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x298b7c5e0770d151e4c5cf6cca4dae3a3ffc8e27',
        created: '1623744882',
        data: [],
      },
      {
        label: 'DOLA/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x7c082bf85e01f9bb343dbb460a14e51f67c58cfb',
        created: '1634484049',
        data: [],
      },
      {
        label: 'MIM/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xe6e14be906c1f1b438da2010b38beca14b387231',
        created: '1635126185',
        data: [],
      },
      {
        label: 'DAI/UST',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x973a67726227ce2747d5710eb44a53fb9abfd02a',
        created: '1621083505',
        data: [],
      },
      {
        label: 'BUSD/USDT',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0xd5ad5ec825cac700d7deafe3102dc2b6da6d195d',
        created: '1620293859',
        data: [],
      },
      {
        label: 'USDC/USDT',
        red: 'Polygon',
        platform: 'Uniswap',
        id: '0x3f5228d0e7d75467366be7de2c31d0d098ba2c23',
        created: '1640136472',
        data: [],
      },
      {
        label: 'USDC/DAI',
        red: 'Polygon',
        platform: 'Uniswap',
        id: '0x5f69c2ec01c22843f8273838d570243fd1963014',
        created: '1640109544',
        data: [],
      },
      {
        label: 'USDC/UST',
        red: 'Polygon',
        platform: 'Uniswap',
        id: '0x90e883972ebcbebc871f3f0658bab1821b8e8705',
        created: '1642479987',
        data: [],
      },
      {
        label: 'USDC/FRAX',
        red: 'Polygon',
        platform: 'Uniswap',
        id: '0xbeaf7156ba07c3df8fac42e90188c5a752470db7',
        created: '1640217382',
        data: [],
      },
      {
        label: 'DAI/USDT',
        red: 'Polygon',
        platform: 'Uniswap',
        id: '0x42f0530351471dab7ec968476d19bd36af9ec52d',
        created: '1640112722',
        data: [],
      },
    ],
    dataCols: [
      {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'date',

        format: (val: number) =>
          date.formatDate(val * 1000, 'DD-MM-YYYY').toString(),
        sortable: true,
      },
      {
        name: 'volume',
        required: true,
        label: 'volume',
        align: 'left',
        field: 'volumen',
        format: (val: number) => (Math.round(val * 100) / 100).toFixed(2),
        sortable: true,
      },
      {
        name: 'tvl',
        required: true,
        label: 'tvl',
        align: 'left',
        field: 'tvl',
        format: (val: number) => (Math.round(val * 100) / 100).toFixed(2),
        sortable: true,
      },
      {
        name: 'apy',
        required: true,
        label: 'apy',
        align: 'center',
        field: 'apy',
        format: (val: string) =>
          String(parseFloat(val) * 100).slice(0, 5) + '%',
        sortable: true,
      },
    ],
  };
}

export default state;
