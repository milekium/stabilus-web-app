<template>
  <q-btn label="update" @click="update" />
  <q-table
    title=""
    :columns="columns"
    :rows="poolsList"
    row-key="id"
    hide-headers
    hide-bottoms
    binary-state-sort
    column-sort-order="da"
    ref="stepper"
    :rows-per-page-options="[31, 60]"
    :visible-columns="['name', 'tvl', 'volume', 'feesUSD', 'apy', 'stabilus']"
  />
</template>

<script lang="ts">
//:sort-method="customSort"
/* eslint-disable */
import { defineComponent, PropType, onMounted, ref, watch, Ref } from 'vue';
import { PoolInterface } from 'src/store/PoolStore/state';
import { TokenInterface } from 'src/store/TokenStore/state';
import { useStore } from 'src/store';

const columns = [
  {
    name: 'id',
    label: 'id',
    align: 'left',
    field: (row: { id: string }) => row.id,
    format: (val: any) => `${val}`,
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
      row.token0.symbol + ' / ' + row.token1.symbol + ' (' + row.network + ')',
    format: (val: any) => `${val}`,
    sortable: false,
  },
  {
    name: 'tvl',
    align: 'center',
    label: 'TVL',
    field: 'totalValueLockedUSD',
    sortable: true,
    format: (val: number) => Number((val / 1).toFixed(0)),
  },
  {
    name: 'volume',
    align: 'center',
    label: 'Volume',
    field: 'volumeUSD',
    sortable: false,
    format: (val: number) => Number((val / 1).toFixed(0)),
  },
  {
    name: 'apy',
    align: 'center',
    label: 'APY',
    field: (row: { volumeUSD: number; feesUSD: number }) =>
      row.feesUSD / row.volumeUSD,
    sortable: false,
    format: (val: number) =>
      val ? Number((val * 100).toFixed(4)) + ' %' : '0 %',
    // sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
  },
  {
    name: 'feesUSD',
    label: 'Fees USD',
    field: (row: { feesUSD: number }) => Number(row.feesUSD).toFixed(2),
    format: (val: number) => `${val}`,
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
      volumeUSD: number;
    }) =>
      row.network == 'Terra'
        ? parseFloat(((row.feesUSD / row.volumeUSD) * 1000).toFixed(2))
        : parseFloat(
            ((row.feesUSD / row.totalValueLockedUSD) * 1000).toFixed(2)
          ),
    // format: (val: number) => `${val}` + ' $',
    sortable: false,
    sort: (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0),
    sortOrder: 'd',
    classes: (row: {
      feesUSD: number;
      totalValueLockedUSD: number;
      network: string;
      volumeUSD: number;
    }) =>
      parseFloat(((row.feesUSD / row.totalValueLockedUSD) * 1000).toFixed(2)) >
      3.99
        ? 'bg-green text-white'
        : 'bg-red-5 text-white',
  },
];

export default defineComponent({
  name: 'FundsListComponent',
  methods: {},
  setup() {
    const stepper = ref();
    const addvalue = ref(100000);
    const $store = useStore();
    const poolsList = $store.state.PoolsModule.pools;
    watch(poolsList, (val) => {
      stepper.value.sort('stabilus');
      stepper.value.sort('stabilus');
    });
    const update = () => {
      if (addvalue.value == 10000000) {
        addvalue.value = 100;
      } else {
        addvalue.value = 10000000;
      }
      console.log(addvalue.value);
      $store.dispatch('PoolsModule/ACTION_TEST', { value: addvalue.value });
      stepper.value.sort('stabilus');
    };
    onMounted(() => {
      stepper.value.sort('stabilus');
      stepper.value.sort('stabilus');
    });
    return {
      columns,
      stepper,
      poolsList,
      update,
    };
  },
});
</script>
