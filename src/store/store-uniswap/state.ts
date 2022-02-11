export interface PoolUniswapDayDataColumnInterface {
  name: string;
  required: boolean;
  label: string;
  align: string;
  field: string;
  format: (arg0: string) => void;
  sortable: boolean;
}
export interface PoolUniswapDayDataInterface {
  id: string;
  date: string;
  volumeETH: number;
  volumeUSD: number;
  volumeUSDUntracked: number;
  feesUSD: number;
  txCount: number;
  tvlUSD: number;
}

export interface StoreUniswapInterface {
  id: string;
  cols: Array<PoolUniswapDayDataColumnInterface>;
  rows: Array<PoolUniswapDayDataInterface>;
}

function state(): StoreUniswapInterface {
  return {
    id: '',
    rows: [],
    cols: [
      {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'date',
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'volumeETH',
        required: true,
        label: 'volumeETH',
        align: 'left',
        field: 'volumeETH',
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'feesUSD',
        required: true,
        label: 'feesUSD',
        align: 'left',
        field: 'feesUSD',
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'date',
        required: true,
        label: 'tvlUSD',
        align: 'left',
        field: 'tvlUSD',
        format: (val: string) => `${val}`,
        sortable: true,
      },
    ],
  };
}

export default state;
