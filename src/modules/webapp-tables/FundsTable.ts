import { formatDemimal } from '../utils/formatter/unit_formatter';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import big, { BigSource } from 'big.js';
import { computed, Ref, ref } from 'vue';
import { QTableProps } from 'quasar';
import { TokenInterface } from 'src/store/TokenStore/state';
import { rows } from './types';
import { formatInteger } from 'src/modules/utils/formatter/unit_formatter';
import { PoolInterface } from 'src/store/PoolStore/state';

const iFormatter = formatInteger({ delimiter: true });
const Formatter = formatDemimal({ decimalPoints: 3, delimiter: true });

const formatBig = (val: BigSource, row: rows) => {
  let div = 1;
  row.network == 'Terra' ? (div = 1000000) : '';

  const bn = big(val).div(div);
  return iFormatter(bn);
};

export const useTable = (tableData: PoolInterface[]) => {
  const table: QTableProps = {};

  // export const iFormatter = formatInteger({ delimiter: true });

  let columns = table.columns;
  columns = [
    {
      name: 'id',
      label: 'id',
      align: 'left',
      field: (row: { id: string }) => row.id,
      sortable: false,
    },
    {
      name: 'name',
      label: 'Name',
      align: 'left',
      field: (row: {
        token0: TokenInterface;
        token1: TokenInterface;
        network: string;
      }) =>
        row.token0.symbol +
        ' / ' +
        row.token1.symbol +
        ' (' +
        row.network +
        ')',
      format: (val: string) => `${val}`,
      sortable: false,
    },
    {
      name: 'tvl',
      align: 'center',
      label: 'TVL',
      field: 'totalValueLockedUSD',
      sortable: true,
      format: (val: number, row: rows) => formatBig(val, row),
    },
    {
      name: 'volume',
      align: 'center',
      label: 'Volume',
      field: 'volumeUSD',
      sortable: false,
      format: (val: string, row: rows) => formatBig(val, row),
    },
    {
      name: 'apy',
      align: 'center',
      label: 'APY',
      field: (row: {
        volumeUSD: number;
        feesUSD: number;
        network: string;
        token0Price: number;
      }) =>
        row.network == 'Terra'
          ? row.token0Price / 365
          : Number(row.feesUSD / row.volumeUSD),
      sortable: false,
      format: (val: number) => (val * 100).toFixed(2) + ' %',
      // sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
    },
    {
      name: 'feesUSD',
      label: 'Fees USD',
      field: (row: { feesUSD: number }) => row.feesUSD,
      format: (val: string, row: rows) => formatBig(val, row),
      sortable: false,
      // sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
    },
    {
      name: 'stabilus',
      label: 'Fees / 1K$',
      field: (row: {
        feesUSD: number;
        totalValueLockedUSD: number;
        network: string;
        token0Price: number;
      }) =>
        row.network == 'Terra'
          ? parseFloat(((row.token0Price / 365) * 1000).toFixed(3))
          : parseFloat(
              ((row.feesUSD / row.totalValueLockedUSD) * 1000).toFixed(3)
            ),
      format: (val: string, row: rows) => Formatter(val),
      sortable: false,
      sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
      sortOrder: 'da',
      classes: (row: {
        feesUSD: number;
        totalValueLockedUSD: number;
        network: string;
        token0Price: number;
        stabilus: number;
      }) =>
        parseFloat(
          ((row.feesUSD / row.totalValueLockedUSD) * 1000).toFixed(3)
        ) > 0.533
          ? 'bg-green text-white'
          : 'bg-red-5 text-white',
    },
  ];
  return { columns: computed(() => columns) };
};
