<template>
  <q-page padding>
    <q-table
      title="Day Data"
      :columns="columns"
      :rows="rows"
      row-key="id"
      hide-headers
      hide-bottoms
      binary-state-sort
      column-sort-order="da"
      ref="stepper"
      :rows-per-page-options="[31, 60]"
      :visible-columns="[
        'id',
        'time',
        'name',
        'red',
        'platform',
        'tvl',
        'volume',
        'feesUSD',
        'apy',
        'stabilus',
        'fund_weight',
      ]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          name="expcsv"
          no-caps
          :visible="loaded"
          @click="exportTable"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable  */
import { Ref, ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
import { FundDataInterface } from 'src/store/FundsStore/state';
import { useTable } from 'src/modules/webapp-tables/FundsTable';
import { useExportCsv } from 'src/modules/webapp-tables/ExportDataCsv';
export default {
  name: 'PoolsDayData',

  setup() {
    const stepper = ref();
    const loaded = ref(false);
    const router = useRoute();
    const $store = useStore();
    const timeRef = router.params.day;
    const filename = 'day_' + timeRef.toString();
    const rows = ref([]);
    const { columns } = useTable(rows.value);

    const fundsList = $store.state.FundsModule;
    const stopwatch = watch(fundsList, () => {
      rows.value = $store.getters['FundsModule/GetFundsByDay']({
        time: timeRef,
      });
      if (rows.value.length == 25) {
        const optimized = (row: { fund_weight: number }) => row.fund_weight > 0;
        if (rows.value.some(optimized)) {
          loaded.value = true;
        }
      }
    });
    onMounted(() => {
      const getvalue = $store.getters['FundsModule/GetFundsByDay']({
        time: timeRef,
      });
      if (getvalue.length == 0) {
        void $store.dispatch('FundsModule/GetFundsDataByDay', {
          time: timeRef,
        });
      } else {
        rows.value = getvalue;
      }
      stepper.value.sort('fees');
    });
    onUnmounted(() => {
      stopwatch();
    });

    function exportTable() {
      const { file } = useExportCsv(columns.value, rows.value, filename);
    }
    return {
      columns,
      rows,
      exportTable,
      stepper,
      timeRef,
      loaded,
    };
  },
};
</script>
