import { formatDemimal } from '../utils/formatter/unit_formatter';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import big, { BigSource } from 'big.js';
import { computed } from 'vue';
import { QTableProps } from 'quasar';
import { rows } from './types';
import { formatInteger } from 'src/modules/utils/formatter/unit_formatter';
import { FundDataInterface, FundInterface } from 'src/store/FundsStore/state';

const iFormatter = formatInteger({ delimiter: true });
const Formatter = formatDemimal({ decimalPoints: 3, delimiter: true });

const formatBig = (val: BigSource, row: FundInterface) => {
  let div = 1;
  row.red == 'Terra' ? (div = 1000000) : '';
  const bn = big(val).div(div);
  return iFormatter(bn);
};

// const FieldStabilus = (row: FundDataInterface) => {
//   return row.platform == 'Terra'
//     ? parseFloat((row.apy * 1000).toFixed(3))
//     : parseFloat(big(row.feesUSD).div(row.tvl).times(1000).toFixed(3));
// };
// const ClassesStabilus = (row: FundDataInterface) => {
//   parseFloat(big(row.feesUSD).div(row.tvl).times(1000).toFixed(3)) > 0.533
//     ? 'bg-green text-white'
//     : 'bg-red-5 text-white';
// };

export const useTable = (tableData: FundDataInterface[]) => {
  const table: QTableProps = {};

  // export const iFormatter = formatInteger({ delimiter: true });

  let columns = table.columns;
  columns = [
    {
      name: 'id',
      label: 'address',
      align: 'left',
      field: (row: { id: string }) => row.id,
      sortable: false,
    },
    {
      name: 'time',
      label: 'time',
      align: 'left',
      field: 'time',
      sortable: false,
    },
    {
      name: 'name',
      label: 'label',
      align: 'left',
      field: 'label',
      sortable: false,
    },
    {
      name: 'red',
      label: 'red',
      align: 'left',
      field: 'red',
      sortable: false,
    },
    {
      name: 'platform',
      label: 'platform',
      align: 'left',
      field: 'platform',
      sortable: false,
    },
    {
      name: 'tvl',
      align: 'center',
      label: 'tvl',
      field: 'tvl',
      sortable: true,
      format: (val: BigSource, row: FundInterface) => formatBig(val, row),
    },
    {
      name: 'volume',
      align: 'center',
      label: 'volume',
      field: 'volume',
      sortable: false,
      format: (val: BigSource, row: FundInterface) => formatBig(val, row),
    },
    {
      name: 'apy',
      align: 'center',
      label: 'apy',
      field: 'apy',
      sortable: false,
      format: (val: number) => (val * 1000).toFixed(3),
      // sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
    },
    {
      name: 'fees',
      label: 'fees',
      field: (row: { feesUSD: number }) => row.feesUSD,
      format: (val: BigSource, row: FundInterface) => formatBig(val, row),
      sortable: false,
      // sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
    },
    {
      name: 'stabilus',
      label: 'fees_100K',
      field: 'stabilus_fees',
      // field: (row: FundDataInterface) => FieldStabilus(row),
      // format: (val: BigSource, row: FundDataInterface) => formatBig(val, row),
      sortable: false,
      sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
      sortOrder: 'da',
      // classes: (row: FundDataInterface) =>
      //   ClassesStabilus(row) as unknown as string,
    },
    {
      name: 'fund_weight',
      label: 'fund_weight',
      field: (row: FundDataInterface) =>
        row.fund_weight ? row.fund_weight : 0,
      // format: (val: BigSource, row: FundDataInterface) => formatBig(val, row),
      sortable: false,
      sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
      sortOrder: 'da',
    },
  ];
  return { columns: computed(() => columns) };
};
