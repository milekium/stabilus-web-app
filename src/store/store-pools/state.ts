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
      {
        label: 'DOLA/USDC',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x7c082bf85e01f9bb343dbb460a14e51f67c58cfb',
        created: '1634484049',
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
        label: 'DAI/FRAX',
        red: 'Ethereum',
        platform: 'Uniswap',
        id: '0x97e7d56a0408570ba1a7852de36350f7713906ec',
        created: '1622219225',
        data: [],
      },
      {
        label: 'UST',
        red: 'Terra',
        platform: 'Anchor',
        id: '2',
        created: '',
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
